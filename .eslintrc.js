module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    "airbnb-typescript/base", // 添加 typescript 支持
    "plugin:vue/vue3-recommended" // 添加高亮行内容到文件 (vue3 的规则）。vue2 使用 plugin:vue/recommended
  ],
  // 添加文件错误解析 parser
  parser: "vue-eslint-parser", // 解析 .vue 文件
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser', // 解析 .ts 文件
    // project: './tsconfig.json',
    // extraFileExtensions: ['.vue'],
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    "vue/no-multiple-template-root": "off", // 启用根层级多个标签
    "vue/script-setup-uses-vars": "error", // 标记 setup 中的变量为 used
  },
};
