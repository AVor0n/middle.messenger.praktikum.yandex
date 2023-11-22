export default {
  'src/**/*.{ts,tsx}': () => ['tsc -p tsconfig.json  --noEmit'],
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.css': ['stylelint --fix', 'prettier --write'],
  '!(*.{ts,css})': ['prettier --write --ignore-unknown'],
};
