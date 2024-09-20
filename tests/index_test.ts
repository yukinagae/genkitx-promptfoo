import assert from 'node:assert';
import { describe, it } from 'node:test';

describe('sample', () => {
  const testCases = [
    {
      should: 'should return the same greeting',
      inputMessage: {
        greeting: 'hello',
      },
      expectedOutput: {
        greeting: 'hello',
      },
    },
  ];
  for (const test of testCases) {
    it(test.should, () => {
      assert.deepEqual(test.inputMessage, test.expectedOutput);
    });
  }
});
