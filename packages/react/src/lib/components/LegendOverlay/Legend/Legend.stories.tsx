import React from "react";
import { Provider } from "react-redux";

import { Legend } from "./Legend";

import { createMockStorybookStore } from "../../../testUtils";

export default {
  title: "Components/LegendOverlay/Legend",
  component: Legend,
  parameters: {
    docs: {
      transformSource: (src) => {
        src = src.replace(/data={\[.*?\]}/gs, "data={[ ...dataset ]}");
        src = src.replaceAll(/undefined,?/g, "");
        src = src.replace(/^\s*\n/gm, "");
        return src;
      },
    },
    chromatic: { delay: 300 },
  },
};

const LegendTemplate = (args) => {
  const store = createMockStorybookStore({});

  return (
    <Provider store={store}>
      <Legend items={args.items} formatters={args.formatters} />
    </Provider>
  );
};

export const Default = {
  name: "All Series Types",
  render: LegendTemplate,
  args: {
    items: [
      {
        name: "Line Series with a very long title that should be truncated at some point",
        icon: "line",
        color: "steelblue",
      },
      { name: "Scatter Series", icon: "circle", color: "steelblue" },
      { name: "Bar Series", icon: "square", color: "steelblue" },
      { name: "Column Series", icon: "square", color: "steelblue" },
      { name: "Area Series", icon: "square", color: "steelblue" },
      { name: "Timestamp", color: "steeblue", icon: "none" },
    ],
  },
};

export const CustomFormatters = {
  name: "Custom Formatting",
  render: LegendTemplate,
  args: {
    items: [{ name: "x", icon: "none" }],
    formatters: {
      x: (name) => `~~~${name}~~~`,
    },
  },
};
