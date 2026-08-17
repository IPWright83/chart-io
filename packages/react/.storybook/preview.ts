import type { Preview } from "@storybook/react";
const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
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
          "Charts",
          ["XYCharts", "RadialCharts", "Hierarchical", "Relational"],
          "Components",
          "Errors & Warnings",
          ["Introduction", "**"],
          "**",
          ["Introduction", "**"],
        ],
      },
    },
  },
};

export default preview;
