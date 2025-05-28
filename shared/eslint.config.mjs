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
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          js: 'never',
        },
      ],
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.ts'],
        },
      },
    },
  },
];
