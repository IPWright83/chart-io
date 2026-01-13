import type { Meta } from "@storybook/react";
import { fn, within } from "@storybook/test";
import React from "react";

import { waves } from "../../../../data/waves";
import { argTypes } from "../../../../storybook/argTypes";
import { createEventReceiverTest } from "../../../testUtils";
import { XAxis, YAxis } from "../../Axis";
import { XYChart } from "../../XYChart";
import { Scatter } from "../Scatter";
import { Line } from "./Line";
import { Lines } from "./Lines";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
  title: "XYCharts/Line",
  component: Line,
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
  args: {
    onClick: fn(),
    onMouseOver: fn(),
    onMouseOut: fn(),
  },
  argTypes: {
    useCanvas,
    width,
    height,
    theme,
    color,
    leftMargin: margin,
    rightMargin: margin,
    topMargin: margin,
    bottomMargin: margin,
  },
} as Meta<typeof Line>;

const LineTemplate = (args) => (
  <XYChart
    data={waves}
    plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin,
    }}
    width={args.width}
    height={args.height}
    animationDuration={args.animationDuration}
    theme={args.theme}
    useCanvas={args.useCanvas}
    onClick={args.onClick}
    onMouseOver={args.onMouseOver}
    onMouseOut={args.onMouseOut}
    zoomBrush={args.zoomBrush}
  >
    <Line
      x={args.x}
      y={args.y}
      color={args.color}
      interactive={!args.withScatter}
    />
    {args.withScatter ? <Scatter x={args.x} y={args.y} /> : null}
    <YAxis fields={[args.y, args.y2, args.y3]} />
    <XAxis fields={[args.x]} />
  </XYChart>
);

const LinesTemplate = (args) => (
  <XYChart
    data={waves}
    plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin,
    }}
    width={args.width}
    height={args.height}
    animationDuration={args.animationDuration}
    theme={args.theme}
    useCanvas={args.useCanvas}
    onClick={args.onClick}
    onMouseOver={args.onMouseOver}
    onMouseOut={args.onMouseOut}
    zoomBrush={args.zoomBrush}
    groupEvents={args.groupEvents}
  >
    <YAxis fields={[args.y, args.y2]} />
    <XAxis fields={[args.x]} />
    <Lines x={args.x} ys={[args.y, args.y2]} />
  </XYChart>
);

export const Basic = {
  name: "Basic Plot",
  render: LineTemplate,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 500,
    color: "#99C1DC",
    theme: "light",
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    y: "sin",
    x: "x",
  },
  play: createEventReceiverTest(
    { clientX: 273, clientY: 408 },
    async (canvasElement) => {
      const canvas = within(canvasElement);

      const tooltip = canvasElement.querySelector(".tooltip-item");
      expect(tooltip).toBeDefined();
    },
  ),
};

export const LineWithPoints = {
  name: "Line with Points",
  render: LineTemplate,
  args: {
    ...Basic.args,
    withScatter: true,
  },
};

export const Color = {
  name: "Custom Color",
  render: LineTemplate,
  args: {
    ...Basic.args,
    color: "orange",
  },
};

export const Canvas = {
  name: "Using Canvas",
  render: LineTemplate,
  args: {
    ...Basic.args,
    useCanvas: true,
  },
  play: createEventReceiverTest(
    { clientX: 273, clientY: 408 },
    async (canvasElement) => {
      const canvas = within(canvasElement);

      const tooltip = canvasElement.querySelector(".tooltip-item");
      expect(tooltip).toBeDefined();
    },
  ),
};

export const LineWithBrush = {
  name: "Line with Brush",
  render: LineTemplate,
  args: {
    ...Basic.args,
    withScatter: true,
    zoomBrush: "inline",
  },
};

export const MultipleLines = {
  name: "Multiple Line Plots",
  render: LinesTemplate,
  args: {
    ...Basic.args,
    y: "sin",
    y2: "cos",
  },
  play: createEventReceiverTest(
    { clientX: 273, clientY: 408 },
    async (canvasElement) => {
      const canvas = within(canvasElement);

      const tooltip = canvasElement.querySelector(".tooltip-item");
      expect(tooltip).toBeDefined();
    },
  ),
};

export const MultipleLinesWithGrouping = {
  name: "Multiple Line Plots with Grouped Tooltips",
  render: LinesTemplate,
  args: {
    ...Basic.args,
    groupEvents: true,
    y: "sin",
    y2: "cos",
  },
  play: createEventReceiverTest(
    { clientX: 273, clientY: 408 },
    async (canvasElement) => {
      const canvas = within(canvasElement);

      const tooltip = canvasElement.querySelector(".tooltip-item");
      expect(tooltip).toBeDefined();
    },
  ),
};
