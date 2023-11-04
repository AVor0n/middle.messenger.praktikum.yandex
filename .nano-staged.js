export default {
  'src/**/*.ts': () => ['tsc -p tsconfig.json  --noEmit'],
  '*.ts': ['eslint --fix', 'prettier --write'],
  '*.css': ['stylelint --fix', 'prettier --write'],
  '!(*.{ts,css})': ['prettier --write --ignore-unknown'],
};
