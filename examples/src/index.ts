import * as z from 'zod';

import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { googleAI } from '@genkit-ai/googleai';

import { gemini15Flash } from '@genkit-ai/googleai';

import { promptfooEval } from 'genkitx-promptfoo';

configureGenkit({
  plugins: [
    googleAI(),
    promptfooEval({
      metrics: [
        {
          type: 'icontains',
          value: 'sushi',
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
