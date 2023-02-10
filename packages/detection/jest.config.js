module.exports = {
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns: ["types/*.*", "index.js"],
    moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        "\\.(css|less)$": "identity-obj-proxy",
        "^uuidv4$": require.resolve("uuid"),
    },
    resetMocks: true,
    roots: ["<rootDir>/src"],
    testEnvironment: "jsdom",
    testMatch: ["**/*.unit.js", "**/*.unit.ts"],
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
    transform: {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": [
            "ts-jest",
            {
                diagnostics: {
                    ignoreCodes: ["TS151001"],
                },
            },
        ],
    },
};
