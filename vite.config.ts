import { defineConfig } from 'vite';
import typescriptPaths from 'vite-tsconfig-paths';
import accessorPlugin from './accessorPlugin';

export default defineConfig({
  plugins: [typescriptPaths(), accessorPlugin()],
  server: {
    port: 3000,
  },
  esbuild: {
    jsxInject: `import { createVNode } from '@shared/NotReact';`,
  },
});
