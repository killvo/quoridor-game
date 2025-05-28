import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import baseConfig from '../eslint.base.mjs';

export default [
  ...baseConfig,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginImport.flatConfigs.recommended,
  {
    plugins: {
      'jsx-a11y': eslintPluginJSXA11y,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // Side effect imports
            ['^react$', '^@?\\w'], // React and packages
            ['^quoridor-game-shared'], // Imports from shared folder
            ['^@/'], // Absolute imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./'], // Relative imports
            ['^.+\\.(module.css|module.scss)$'], // Style modules
          ],
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-useless-constructor': 'off',
      'import/prefer-default-export': 'off',
      'no-case-declarations': 'off',
      'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
          js: 'never',
          jsx: 'never',
        },
      ],
      'object-curly-newline': 'off',
      'class-methods-use-this': 'off',
      'react/function-component-definition': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/jsx-filename-extension': 'off',
      'no-param-reassign': [
        'error',
        {
          ignorePropertyModificationsFor: ['^draft', '^state'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png', '.svg'],
        },
      },
    },
  },
];
