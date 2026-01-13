module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    ignorePatterns: ["jest.config.js", ".eslintrc.js"],
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "valid-jsdoc": [
            "warn",
            {
                requireReturnType: false,
                requireParamType: false,
            },
        ],
        "@typescript-eslint/ban-ts-comment": "warn",
    },
};
