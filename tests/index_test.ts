import assert from 'node:assert';
import { describe, it } from 'node:test';

import type { BaseDataPoint, Score } from '@genkit-ai/ai/evaluator';
import { type PromtpfooMetric, promptfooScore } from '../src/index';

interface TestCase {
  should: string;
  args: {
    d: BaseDataPoint;
    metric: PromtpfooMetric;
  };
  expected: Score;
}

describe('promptfooScore', () => {
  const testCases: TestCase[] = [
    {
      should: 'should return a succeeding test result',
      args: {
        d: {
          output: 'Hello, World!',
        },
        metric: {
          type: 'contains',
          value: 'Hello',
        },
      },
      expected: {
        score: 1,
        details: {
          reasoning: 'Assertion passed',
        },
      },
    },
    {
      should: 'should return a failing test result',
      args: {
        d: {
          output: 'Aloha, World!',
        },
        metric: {
          type: 'contains',
          value: 'Hello',
        },
      },
      expected: {
        score: 0,
        details: {
          reasoning: 'Assertion failed: Expected output to contain "Hello"',
        },
      },
    },
  ];
  for (const test of testCases) {
    it(test.should, async () => {
      const actual = await promptfooScore(test.args.d, test.args.metric);
      assert.deepEqual(actual, test.expected);
    });
  }
});
