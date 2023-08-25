/// <reference types="vitest" />
import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';
import typescriptPaths from './vite-plugin-typescript-paths';

export default defineConfig({
  plugins: [handlebars(), typescriptPaths()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    coverage: {
      reporter: ['html'],
      reportsDirectory: 'coverage',
    },
  },
});
