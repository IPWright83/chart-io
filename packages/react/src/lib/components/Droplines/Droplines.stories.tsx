import { themes } from "@chart-io/core";

import isChromatic from "chromatic/isChromatic";
import React from "react";
import { Provider } from "react-redux";

import { Droplines } from ".";

import { createMockStorybookStore } from "../../testUtils";

export default {
  title: "Components/Droplines",
  component: Droplines,
  parameters: {
    chromatic: { delay: 300 },
  },
};

const DroplinesTemplate = (args) => {
  const store = createMockStorybookStore({
    chart: {
      animationDuration: isChromatic() ? 0 : 1000,
      theme: themes.light,
    },
    event: {
      droplines: [
        {
          isHorizontal: true,
          color: "steelblue",
          x1: 150,
          x2: 0,
          y1: 50,
          y2: 50,
        },
        {
          isVertical: true,
          color: "steelblue",
          x1: 150,
          x2: 150,
          y1: 50,
          y2: 150,
        },
      ],
    },
  });

  return (
    <Provider store={store}>
      <svg>
        <Droplines
          showVertical={args.showVertical}
          showHorizontal={args.showHorizontal}
        />
      </svg>
    </Provider>
  );
};

export const Default = {
  name: "Horizontal & Vertical Droplines",
  render: DroplinesTemplate,
  args: {
    showVertical: true,
    showHorizontal: true,
  },
};

export const VerticalDroplines = {
  name: "Vertical Droplines",
  render: DroplinesTemplate,
  args: {
    showVertical: true,
    showHorizontal: false,
  },
};

export const HorizontalDroplines = {
  name: "Horizontal Droplines",
  render: DroplinesTemplate,
  args: {
    showVertical: false,
    showHorizontal: true,
  },
};
