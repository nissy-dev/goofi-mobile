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
    "react/prop-types": "off",
    // too noisy
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "react-hooks/rules-of-hooks": "error",
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
