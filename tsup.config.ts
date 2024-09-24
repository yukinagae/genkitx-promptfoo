
import { defineConfig, Options } from 'tsup';

export const defaultOptions = {
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  shims: true,
  outDir: 'lib',
  entry: ['src/**/*.ts', '!src/**/*.test.ts'],
  bundle: false,
  treeshake: false,
};

export default defineConfig({
  ...(defaultOptions as Options),
});
