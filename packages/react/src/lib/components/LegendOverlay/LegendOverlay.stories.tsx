import { d3, themes } from "@chart-io/core";

import React from "react";
import { Provider } from "react-redux";

import { LegendOverlay } from "./";

import { createMockStorybookStore } from "../../testUtils";

export default {
  title: "Components/LegendOverlay",
  component: LegendOverlay,
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

const LegendOverlayTemplate = (args) => {
  const store = createMockStorybookStore({
    chart: {
      theme: themes.light,
      dimensions: {
        width: 800,
        height: 400,
      },
      legend: {
        items: [
          {
            name: "Line Series with a very long title that should be truncated at some point",
            icon: "line",
            color: "steelblue",
          },
          { name: "Series 2", icon: "circle", color: "steelblue" },
          { name: "Series 3", icon: "square", color: "steelblue" },
          { name: "Series 4", icon: "circle", color: "steelblue" },
          { name: "Series 5", icon: "circle", color: "steelblue" },
          { name: "Series 6", icon: "circle", color: "steelblue" },
          { name: "Series 7", icon: "circle", color: "steelblue" },
          { name: "Series 8", icon: "circle", color: "steelblue" },
          { name: "Series 9", icon: "circle", color: "steelblue" },
          { name: "Series 10", icon: "circle", color: "steelblue" },
        ],
      },
    },
  });

  return (
    <Provider store={store}>
      <svg width="1600px" height="400px" style={{ background: "#CCC" }}>
        <LegendOverlay position={args.position} formatters={args.formatters} />
      </svg>
    </Provider>
  );
};

export const West = {
  name: "Docked West",
  render: LegendOverlayTemplate,
  args: {
    position: "W",
  },
};

export const East = {
  name: "Docked East (the default)",
  render: LegendOverlayTemplate,
  args: {
    position: "E",
  },
};

export const North = {
  name: "Docked North",
  render: LegendOverlayTemplate,
  args: {
    position: "N",
  },
};

export const South = {
  name: "Docked South",
  render: LegendOverlayTemplate,
  args: {
    position: "S",
  },
};

export const SouthEast = {
  name: "Docked SouthEast",
  render: LegendOverlayTemplate,
  args: {
    position: "SE",
  },
};

const SizeLegendTemplate = (args) => {
  const store = createMockStorybookStore({
    chart: {
      theme: themes.light,
      dimensions: {
        width: 800,
        height: 400,
      },
      scales: {
        population: {
          scale: d3.scaleLinear().domain([0, 500]).range([5, 25]),
          domain: [0, 500],
          range: [5, 25],
        },
      },
      legend: {
        items: [{ name: "Series 1", icon: "circle", color: "steelblue" }],
        sizeLegend: { field: "population", ticks: 3 },
      },
    },
  });

  return (
    <Provider store={store}>
      <svg width="1600px" height="400px" style={{ background: "#CCC" }}>
        <LegendOverlay position={args.position} />
      </svg>
    </Provider>
  );
};

export const WithSizeLegend = {
  name: "With a Size Legend (from ZAxis)",
  render: SizeLegendTemplate,
  args: {
    position: "E",
  },
};
