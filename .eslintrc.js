module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'no-undef': 'off',
    'no-constant-condition': 'off',
    'space-before-function-paren': 'off'
    // add your custom rules here
    // it is base on https://github.com/vuejs/eslint-config-vue
  }
}
