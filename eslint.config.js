// https://docs.expo.dev/guides/using-eslint/
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

export default [
  ...expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '.expo/**', 'node_modules/**'],
  },
];
