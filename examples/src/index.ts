import * as z from 'zod';

import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { gemini15Flash, vertexAI } from '@genkit-ai/vertexai';

import { promptfooEval } from 'genkitx-promptfoo';

configureGenkit({
  plugins: [
    vertexAI(),
    promptfooEval({
      metrics: [
        {
          type: 'icontains',
          value: 'cheese',
        },
        {
          type: 'similar',
          value: 'Aloha, World!',
          threshold: 0.8,
          provider: 'vertex:embedding:text-embedding-004',
        },
        {
          type: 'llm-rubric',
          value: 'It is referring to the ingredients of food.',
          provider: 'vertex:gemini-1.5-flash',
        },
      ],
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
export const menuSuggestionFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Suggest an item for the menu of a ${subject} themed restaurant`,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);

startFlowsServer();
