export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  options: {
    storySort: {
      order: [
        "Introduction",
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
