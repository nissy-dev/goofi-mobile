module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["@typescript-eslint", "react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "react/display-name": "warn",
    "@typescript-eslint/explicit-member-accessibility": "warn",
  },
  env: {
    node: true,
    es6: true,
    jest: true
  },
  settings: {
    react: {
      version: "detect"
    },
  },
}
