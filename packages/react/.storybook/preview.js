export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  options: {
    storySort: {
      order: [
        "Introduction",
        "Getting Started",
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
};
