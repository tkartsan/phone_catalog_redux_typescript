// eslint.config.cjs
const babelParser = require('@babel/eslint-parser');
const reactPlugin = require('eslint-plugin-react');
const prettierPlugin = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021, // Supports modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      parser: babelParser, // Use Babel ESLint parser
      parserOptions: {
        requireConfigFile: false, // Use without a separate Babel config file
        babelOptions: {
          presets: ['@babel/preset-react'], // Enable React support
        },
      },
      globals: {
        window: 'readonly', // Define browser global variables
        document: 'readonly',
        console: 'readonly',
        process: 'readonly', // Node.js global
      },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      import: importPlugin, // Add eslint-plugin-import
      'simple-import-sort': simpleImportSortPlugin, // Add eslint-plugin-simple-import-sort
    },
    rules: {
      'no-undef': 'error', // Ensure undefined variables are flagged as errors
      'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
      'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'always', prev: 'export', next: 'export' },
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'always', prev: 'let', next: '*' },
      { blankLine: 'any', prev: 'const', next: 'const' },
      { blankLine: 'any', prev: 'let', next: 'let' },
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    'react-hooks/exhaustive-deps': 'off',
    "react-refresh/only-export-components": "off",
    'no-case-declarations': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^react', '^@?\\w'],
          ['^[^.]'],
          // Parent imports, `..` etc.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
      react: {
        version: 'detect', // Automatically detects the React version
      },
    },
  },
  {
    ignores: ['dist'], // Use `ignores` to specify files and folders to ignore
  },
];