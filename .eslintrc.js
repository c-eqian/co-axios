/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-20 13:39:54
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-29 09:31:22
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
    amd: true
  },
  // ts eslint 配置
  parserOptions: {
    parser:'@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:prettier/recommended','plugin:@typescript-eslint/recommended'],
  // js eslint 配置
  // parserOptions: {
  //   parser: 'babel-eslint',
  //   sourceType: 'module'
  // },
  // plugins: ['html', 'vue'],
  // extends: ['plugin:vue/recommended', 'eslint:recommended'],

  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    'max-len': 'off',
     // 统一豁免规则，原因：直接修改可能对现有功能产生影响
     'eqeqeq': 1,
    //  'vue/no-v-html': 1,
     // 其中代码本身有问题的规则错误有
     'no-undef': 0,
     'import/no-duplicates': 0,

     // 可能引起格式化问题但建议手动修改代码的有
     'no-plusplus': 0,
     'no-eval': 0,
     'no-prototype-builtins': 0,
     'no-multi-assign': 0,
     'no-unused-vars': 0,
     'no-useless-escape': 0,
     'camelcase': 0,
     'no-param-reassign': 0,
     'prefer-const': 0,
     'prefer-destructuring': 0,
     'no-underscore-dangle': 0,
     'no-restricted-syntax': 0,
     'no-nested-ternary': 0,
     'radix': 0,
     'function-paren-newline': 0,
  },
};
