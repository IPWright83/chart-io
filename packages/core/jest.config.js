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
    testMatch: ["**/*.unit.js", "**/*.unit.ts"],
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!@chart-io/d3/.*)"],
    transform: {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": ["@swc/jest"],
    },
};
