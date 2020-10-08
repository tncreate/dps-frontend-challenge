module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-eval': 0,
    "ignoreStrings": true,
    "no-plusplus": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "class-methods-use-this": 0,
    "import/prefer-default-export": 0,
    "max-len": 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
