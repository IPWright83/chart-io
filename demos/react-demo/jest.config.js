module.exports = {
    moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        "\\.(css|less)$": "identity-obj-proxy",
    },
    resetMocks: true,
    roots: ["<rootDir>/src"],
    testEnvironment: "jsdom",
    testEnvironmentOptions: { resources: "usable" },
    testMatch: ["**/*.unit.jsx", "**/*.unit.tsx"],
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!@chart-io/d3/.*)"],
    transform: {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": ["@swc/jest"],
    },
};
