module.exports = {
  stories: ["../**/*.stories.mdx", "../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        scriptsPackageName: "react-scripts",
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
};
