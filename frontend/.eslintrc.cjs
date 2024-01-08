module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'react-hooks',
    'import',
    'jsdoc',
    'jest',
    'cypress',
  ],
  globals: {
    JSX: true,
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    radix: 'off',
    'arrow-parens': 'error',
    'no-prototype-builtins': 'off',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',
    'prefer-template': 'error',
    'no-use-before-define': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*'],
      },
    ],
    '@typescript-eslint/space-before-blocks': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    "@typescript-eslint/quotes": [
      "error",
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        typedefs: true,
      },
    ],
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/implements-on-classes': 'error',
    'jsdoc/no-undefined-types': 'error',
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-jsdoc': 'error',
    'jsdoc/require-param': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'error',
    'jsdoc/require-returns-check': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/valid-types': 'error',
    semi: ['error', 'always'],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'log'],
      },
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-unused-prop-types': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-extraneous-dependencies': 'off',
  },
};
