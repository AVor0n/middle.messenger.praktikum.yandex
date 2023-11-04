/// <reference types="vitest" />
import { defineConfig } from 'vite';
import typescriptPaths from './vite-plugin-typescript-paths';

export default defineConfig({
  plugins: [typescriptPaths()],
  server: {
    port: 3000,
  },
  esbuild: {
    jsxInject: `import { createVNode } from '@shared';`,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['html'],
      reportsDirectory: 'coverage',
    },
  },
});
