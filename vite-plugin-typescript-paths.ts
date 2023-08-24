import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface TSConfigType {
  compilerOptions: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function removeComments(content: string) {
  return content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/gu, '');
}

function getTsConfig() {
  const tsConfigPath = path.resolve(dirname, 'tsconfig.json');
  const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf8');
  const strippedContent = removeComments(tsConfigContent);
  return JSON.parse(strippedContent) as TSConfigType;
}

function getAliasesFromTsConfig() {
  const tsConfig = getTsConfig();
  const aliases = {};
  const baseUrl = tsConfig.compilerOptions.baseUrl ?? './';
  if (tsConfig.compilerOptions.paths) {
    // eslint-disable-next-line guard-for-in
    for (const alias in tsConfig.compilerOptions.paths) {
      const paths = tsConfig.compilerOptions.paths[alias];
      aliases[alias] = path.resolve(dirname, `${baseUrl}/${paths[0]}`);
    }
  }
  return aliases;
}

export default () => ({
  name: 'vite-plugin-typescript-paths',
  config: () => {
    const alias = getAliasesFromTsConfig();
    return {
      resolve: {
        alias,
      },
    };
  },
});
