module.exports = {
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns: [
        "stories/*.*",
        "types/*.*",
        "index.js",
        "uuidv4.js",
        "interpolateMultiPath.js",
        "hoc/withTheme/*.*",
        "jest",
        "data",
        "lib/testUtils",
        "storybook",
    ],
    moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        "\\.(css|less)$": "identity-obj-proxy",
        "^d3-array$": "<rootDir>/node_modules/d3-array/dist/d3-array.min.js",
        "^d3-axis$": "<rootDir>/node_modules/d3-axis/dist/d3-axis.min.js",
        "^d3-color$": "<rootDir>/node_modules/d3-color/dist/d3-color.min.js",
        "^d3-ease$": "<rootDir>/node_modules/d3-ease/dist/d3-ease.min.js",
        "^d3-format$": "<rootDir>/node_modules/d3-format/dist/d3-format.min.js",
        "^d3-scale$": "<rootDir>/node_modules/d3-scale/dist/d3-scale.min.js",
        "^d3-selection$": "<rootDir>/node_modules/d3-selection/dist/d3-selection.min.js",
        "^d3-shape$": "<rootDir>/node_modules/d3-shape/dist/d3-shape.min.js",
        "^d3-time-format$": "<rootDir>/node_modules/d3-time-format/dist/d3-time-format.min.js",
        "^d3-timer$": "<rootDir>/node_modules/d3-timer/dist/d3-timer.min.js",
        "^d3-transition$": "<rootDir>/node_modules/d3-transition/dist/d3-transition.min.js",
    },
    resetMocks: true,
    roots: ["<rootDir>/src"],
    setupFiles: ["react-app-polyfill/jsdom"],
    setupFilesAfterEnv: ["<rootDir>/src/jest/setupTests.js"],
    testEnvironment: "jsdom",
    testMatch: ["**/*.unit.js", "**/*.unit.jsx", "**/*.unit.ts", "**/*.unit.tsx"],
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    transform: {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "ts-jest",
        "^.+\\.css$": "<rootDir>/src/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/src/jest/fileTransform.js",
    },
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
