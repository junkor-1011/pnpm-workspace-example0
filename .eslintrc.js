// @ts-check
const { builtinModules } = require('node:module');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.ts', 'tsx'],
      },
    ],
    'react/require-default-props': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'import/extensions': [
      2,
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'always',
      },
    ],
    // @emotion/react
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  }
})
