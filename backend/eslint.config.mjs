import tsParser from '@typescript-eslint/parser';
import baseConfig from '../eslint.base.mjs';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    ignores: ['swc.register.js', 'ts-node.register.js'],
  },
  {
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // Side effect imports
            ['^nest$', '^@?\\w'], // Nest.js and packages
            ['^quoridor-game-shared'], // Imports from shared folder
            ['^~/', '^~db/', '^~libs/', '^~modules/', '^~shared/'], // Absolute imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./'], // Relative imports
          ],
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          js: 'never',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': ["error", { accessibility: "explicit" }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.ts', '.json'],
        },
      },
    },
  },
  {
    files: ['test/**'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.entity.ts', '**/*.dto.ts'],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'off'
    }
  }
];
