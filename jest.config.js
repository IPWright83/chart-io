module.exports = {
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns: ["stories/*.*", "types/*.*", "index.js", "uuidv4.js", "interpolateMultiPath.js"],
    moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    },
    modulePaths: ["/home/ian/src/chart-it/src"],
    resetMocks: true,
    roots: ["<rootDir>/src"],
    setupFiles: ["react-app-polyfill/jsdom"],
    setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.js"],
    testEnvironment: "jsdom",
    testMatch: ["**/*.unit.js"],
    testRunner: "/home/ian/src/chart-it/node_modules/jest-circus/runner.js",
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    transform: {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
    },
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};

// "jest": {
//     "moduleNameMapper": {
//       "^react-native$": "react-native-web",
//       "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
//     },
//     "moduleFileExtensions": [
//       "web.js",
//       "js",
//       "web.ts",
//       "ts",
//       "web.tsx",
//       "tsx",
//       "json",
//       "web.jsx",
//       "jsx",
//       "node"
//     ],
//   },
