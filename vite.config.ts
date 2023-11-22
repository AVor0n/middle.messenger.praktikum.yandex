import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import typescriptPaths from 'vite-tsconfig-paths';
import accessorPlugin from './accessorPlugin';

export default defineConfig({
  plugins: [
    typescriptPaths(),
    accessorPlugin(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    port: 3000,
  },
  esbuild: {
    jsxInject: `import { createVNode } from '@shared/NotReact';`,
  },
});
