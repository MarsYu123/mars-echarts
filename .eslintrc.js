module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': ['warn', {allow: ['error','warn']}],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-void': 0,
    'camelcase': 0,
    'eqeqeq': 1,
    'no-unused-expressions': 0,
    'no-useless-return': 0,
    'no-duplicate-imports': 0,
    'no-useless-escape': 0,
    'no-control-regex': 0,
    'promise/param-names': 0,
    'import/no-duplicates': 0,
    'quotes': [1, 'single', 'avoid-escape'],
    'semi': [1, 'never'],
    'vue/multi-word-component-names': 0,
    'no-unreachable': 1
  }
}
