module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser", // used to parse <script> blocks
    requireConfigFile: false, // don't require a separate babel config
    ecmaVersion: 2020,
    sourceType: "module",
    babelOptions: {
      presets: ["@babel/preset-env"],
    },
  },
  extends: [
    "plugin:vue/recommended", // Vue 2 rules
    "eslint:recommended",
  ],
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/html-indent": ["error", 2],
    "vue/max-attributes-per-line": ["error", { singleline: 3, multiline: 1 }],
  },
};
