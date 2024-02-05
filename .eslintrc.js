module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  plugins: [],
  // add your custom rules here
  rules: {
    "comma-dangle": ["warn", "always-multiline"],
    semi: ["warn", "always"],
    quotes: ["warn", "double"],
    "space-before-function-paren": ["warn", "never"],
    "vue/max-attributes-per-line": "off",
    "import/prefer-default-export": "off",
    "lines-between-class-members": "off",
    "func-names": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": ["error", { props: false }],
    camelcase: ["error", { properties: "never", ignoreDestructuring: true }],
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true },
        ImportDeclaration: { multiline: true, consistent: true },
        ExportDeclaration: { multiline: true, consistent: true },
      },
    ],
    "array-bracket-spacing": ["error", "never"],
    eqeqeq: ["error", "always"],
  },
};
