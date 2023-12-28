module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      files: "*.unit.tsx?",
      rules: {
        "valid-jsdoc": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["jest.config.js", ".eslintrc.js", "**/jest/*.js", "testUtils/*.ts"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "valid-jsdoc": [
      "warn",
      {
        requireReturnType: false,
        requireParamType: false,
        requireReturn: false,
      },
    ],
    "sort-imports": [
      "warn",
      {
        allowSeparatedGroups: true,
        ignoreCase: true,
      },
    ],
  },
};
