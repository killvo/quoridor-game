import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import importRecommended from 'eslint-plugin-import/config/flat/recommended.js';
import importTypeScript from 'eslint-plugin-import/config/flat/recommended.js';

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  eslintPluginImport.flatConfigs.recommended,
  importRecommended,
  importTypeScript,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ['node_modules/**', '**/dist/**', '**/*.mjs', 'index.js', '.lintstagedrc.js'],
  },
  {
    files: ['**/*.js'],
    ...tsEslint.configs.disableTypeChecked,
  },
  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      '@typescript-eslint': eslintPluginTypeScript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "SwitchCase > *.consequent[type!='BlockStatement']",
          message: 'All switch cases must use blocks (e.g., `{}`). Cases without blocks are disallowed.',
        },
        {
          selector: 'ExportAllDeclaration',
          message: 'Exporting everything (*) is not allowed. Explicit exports are preferred.',
        },
        {
          selector: 'ImportAllDeclaration',
          message: 'Importing everything (*) is not allowed. Use named imports instead.',
        },
        {
          selector: 'ImportDeclaration[importKind=type]',
          message: 'Use `import { type X }` instead of `import type { X }` for consistency.',
        },
        {
          selector: 'ExportNamedDeclaration[exportKind=type]',
          message: 'Use `export { type X }` instead of `export type { X }` for consistency.',
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['shared/*', '!shared'],
              message: 'Import shared modules only from the root.',
            },
          ],
          paths: [
            { name: 'assert', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'async_hooks',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'buffer', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'child_process',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'cluster', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'console', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'constants',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'crypto', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'dgram', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'diagnostics_channel',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'dns', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'domain', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'events', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'fs', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'fs/promises',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'http', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'http2', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'https', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'inspector',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'module', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'net', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'os', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'path', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'perf_hooks',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'process', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'punycode', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'querystring',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'readline', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'repl', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'stream', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'string_decoder',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'timers', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'tls', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'trace_events',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'tty', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'url', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'util', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'v8', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'vm', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            { name: 'wasi', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
            {
              name: 'worker_threads',
              message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.',
            },
            { name: 'zlib', message: 'Prefer using the `node:` protocol when importing Node.js built-in modules.' },
          ],
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'no-tabs': ['error', { allowIndentationTabs: true }],
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
      'max-len': 'off',
      'arrow-body-style': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
        },
      ],
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',

      'comma-dangle': 'off',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/space-before-blocks': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/explicit-function-return-type': ['error', { allowTypedFunctionExpressions: true }],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-misused-promises': [2, {
        checksVoidReturn: {
          attributes: false
        }
      }]
    },
  },
];
