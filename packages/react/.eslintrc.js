module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
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
    plugins: ["react", "@typescript-eslint"],
    ignorePatterns: ["jest.config.js", ".eslintrc.js", "**/jest/*.js", "testUtils/*.ts", "*.stories.tsx"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "valid-jsdoc": [
            "warn",
            {
                requireReturnType: false,
                requireParamType: false,
                requireReturn: false,
            },
        ],
        "@typescript-eslint/ban-ts-comment": "warn",
    },
};
