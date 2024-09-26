import {
  type BaseDataPoint,
  type EvaluatorAction,
  type Score,
  defineEvaluator,
} from '@genkit-ai/ai/evaluator';
import { type PluginProvider, genkitPlugin } from '@genkit-ai/core';
import promptfoo from 'promptfoo';
import type { AssertionType, AssertionValue } from 'promptfoo';
import type * as z from 'zod';

export interface PromtpfooMetric {
  type: AssertionType;
  value?: AssertionValue;
  provider?: string;
  threshold?: number;
}

export interface PluginOptions<ModelCustomOptions extends z.ZodTypeAny> {
  metrics?: Array<PromtpfooMetric>;
}

export function promptfooEval<ModelCustomOptions extends z.ZodTypeAny>(
  params: PluginOptions<ModelCustomOptions>
): PluginProvider {
  const plugin = genkitPlugin(
    'promptfoo',
    async (params: PluginOptions<ModelCustomOptions>) => {
      const { metrics } = params;
      if (!metrics) {
        throw new Error('Found no configured metrics.');
      }
      let evaluators: EvaluatorAction[] = [];
      evaluators = [...createPromtpfooEvaluators(metrics)];
      return { evaluators };
    }
  );
  return plugin(params);
}

export function createPromtpfooEvaluators(
  metrics: PromtpfooMetric[]
): EvaluatorAction[] {
  return metrics.map((metric) => {
    let displayName = metric.value
      ? `${metric.type} / ${metric.value}`
      : metric.type;
    if (metric.provider) {
      displayName += ` / ${metric.provider}`;
    }
    return defineEvaluator(
      {
        name: `promptfoo/${metric.type}:${metric.value}`,
        displayName: displayName,
        definition: `${metric.type}: refer to https://www.promptfoo.dev/docs/configuration/expected-outputs/`,
      },
      async (datapoint: BaseDataPoint) => {
        try {
          const score = await promptfooScore(datapoint, metric);
          return {
            testCaseId: datapoint.testCaseId,
            evaluation: score,
          };
        } catch (e) {
          return {
            testCaseId: datapoint.testCaseId,
            evaluation: {
              error: `${e}`,
            },
          };
        }
      }
    );
  });
}

export async function promptfooScore(
  d: BaseDataPoint,
  metric: PromtpfooMetric
): Promise<Score> {
  const assertion: {
    type: AssertionType;
    value?: AssertionValue;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    provider?: any;
    threshold?: number;
  } = {
    type: metric.type,
    ...(metric.value && { value: metric.value }),
    ...(metric.provider && { provider: metric.provider }),
    ...(metric.threshold && { threshold: metric.threshold }),
  };

  const summary = await promptfoo.evaluate({
    prompts: [d],
    providers: [
      (_prompt, _context) => {
        return Promise.resolve({
          output: d.output,
        });
      },
    ],
    tests: [
      {
        assert: [assertion],
      },
    ],
  });
  const score = summary.results[0].score;
  const reasoning = summary.results[0].error
    ? summary.results[0].error // error reason
    : summary.results[0].gradingResult?.componentResults?.[0]?.reason; // success reason
  return {
    score: score,
    details: { reasoning },
  };
}

export default promptfooEval;
