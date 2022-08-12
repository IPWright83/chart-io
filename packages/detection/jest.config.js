module.exports = {
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns: ["types/*.*", "index.js"],
    moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        "\\.(css|less)$": "identity-obj-proxy",
    },
    resetMocks: true,
    roots: ["<rootDir>/src"],
    testEnvironment: "jsdom",
    testMatch: ["**/*.unit.js"],
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
