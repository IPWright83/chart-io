import { themes } from "@chart-io/core";

import isChromatic from "chromatic/isChromatic";
import React from "react";
import { Provider } from "react-redux";

import { Markers } from ".";

import { createMockStorybookStore } from "../../testUtils";

export default {
  title: "Components/Markers",
  component: Markers,
  parameters: {
    chromatic: { delay: 300 },
  },
};

const MarkersTemplate = (args) => {
  const store = createMockStorybookStore({
    chart: {
      animationDuration: isChromatic() ? 0 : 1000,
      theme: {
        ...themes.light,
        markers: {
          ...themes.light.markers,
          shadow: args.shadow,
          stroke: args.stroke,
          strokeWidth: args.strokeWidth,
        },
      },
    },
    event: {
      markers: [
        {
          fill: args.fill,
          stroke: args.stroke,
          r1: 10,
          r2: 40,
          cx: 50,
          cy: 50,
        },
      ],
    },
  });

  return (
    <Provider store={store}>
      <svg width="300px" height="300px">
        <g transform="translate(50,50)">
          <Markers />
        </g>
      </svg>
    </Provider>
  );
};

export const Default = {
  name: "Markers",
  render: MarkersTemplate,
  args: {
    fill: "steelblue",
    stroke: "white",
    shadow: false,
  },
};

export const Outline = {
  name: "Outline",
  render: MarkersTemplate,
  args: {
    stroke: "steelblue",
    fill: null,
    shadow: false,
  },
};

export const Shadow = {
  name: "Shadow",
  render: MarkersTemplate,
  args: {
    fill: "steelblue",
    shadow: true,
    strokeWidth: 3,
    stroke: "white",
  },
};
