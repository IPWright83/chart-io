import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Getting Started",
          "Extensibility",
          "Theming",
          "XYCharts",
          "Components",
          "Errors & Warnings",
          ["Introduction", "**"],
          "Architecture",
          "**",
          ["Introduction", "**"],
        ],
      },
    },
  },
};

export default preview;
