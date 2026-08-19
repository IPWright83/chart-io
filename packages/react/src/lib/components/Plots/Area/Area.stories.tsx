import type { Meta } from "@storybook/react";
import { expect, fn, within } from "@storybook/test";
import React, { useMemo } from "react";

import { streamData } from "../../../../data/stream_data";
import { waves } from "../../../../data/waves";
import { argTypes } from "../../../../storybook/argTypes";
import { jitterFields, withDataControls } from "../../../../storybook/dataControls";
import { createEventReceiverTest } from "../../../testUtils";
import { XAxis, YAxis } from "../../Axis";
import { XYChart } from "../../XYChart";
import { Area } from "./Area";
import { Areas } from "./Areas";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
  title: "Charts/XYCharts/Area",
  component: Area,
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
} as Meta<typeof Area>;;

const AreaTemplate = (args) => (
  <XYChart
    data={args.data ?? waves}
    plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin,
    }}
    height={args.height}
    width={args.width}
    animationDuration={args.animationDuration}
    useCanvas={args.useCanvas}
    zoomBrush={args.zoomBrush}
  >
    <Area x={args.x} y={args.y} y2={args.y2} color={args.color} />
    <YAxis fields={[args.y]} />
    <XAxis fields={[args.x]} />
  </XYChart>
);

// Wave field names that carry values to animate; "x" stays untouched so points remain ordered.
const waveFields = ["sin", "cos", "tan", "sinh", "cosh"];

function nextWavePoint(current: typeof waves) {
  const last = current[current.length - 1] ?? waves[0];
  const x = last.x + 10;
  const rad = x * (Math.PI / 180);
  return {
    x,
    sin: Math.sin(rad),
    cos: Math.cos(rad),
    tan: Math.tan(rad),
    sinh: Math.sinh(rad),
    cosh: Math.cosh(rad),
  };
}

const waveDataControls = {
  initialData: waves,
  randomize: (row: (typeof waves)[number]) => jitterFields(row, waveFields, 0.3),
  createPoint: nextWavePoint,
  minLength: 5,
};

const AreaTemplateWithControls = withDataControls(AreaTemplate, waveDataControls);

const AreasTemplate = (args) => (
  <XYChart
    plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin,
    }}
    data={waves}
    height={args.height}
    width={args.width}
    animationDuration={args.animationDuration}
    useCanvas={args.useCanvas}
    theme={args.theme}
    onClick={args.onClick}
    onMouseOver={args.onMouseOver}
    onMouseOut={args.onMouseOut}
    zoomBrush={args.zoomBrush}
    groupEvents={args.groupEvents}
  >
    <YAxis fields={[args.y, args.y2]} />
    <XAxis fields={[args.x]} />
    <Areas x={args.x} ys={[args.y, args.y2]} />
  </XYChart>
);

const StackedAreasTemplate = (args) => {
  return (
    <XYChart
      plotMargin={{
        left: args.leftMargin,
        right: args.rightMargin,
        top: args.topMargin,
        bottom: args.bottomMargin,
      }}
      data={waves}
      height={args.height}
      width={args.width}
      animationDuration={args.animationDuration}
      theme={args.theme}
      useCanvas={args.useCanvas}
      onClick={args.onClick}
      onMouseOver={args.onMouseOver}
      onMouseOut={args.onMouseOut}
      zoomBrush={args.zoomBrush}
    >
      <YAxis fields={[args.y, args.y2]} aggregate={true} />
      <XAxis fields={[args.x]} />
      <Areas x={args.x} ys={[args.y, args.y2]} stacked={true} />
    </XYChart>
  );
};

// A streamgraph is a stacked area with a `wiggle` offset - it floats the baseline (rather than
// stacking from zero) so the bands read as flowing ribbons instead of a bar-chart-shaped block
const streamFields = ["Amanda", "Ashley", "Betty", "Deborah", "Dorothy", "Helen", "Linda", "Patricia"];

// The wiggle offset can push layers above and below zero, so the y-scale's usual `aggregate`
// (zero-to-sum) domain doesn't fit - it needs an explicit domain sized to the largest yearly total
const maxStreamTotal = Math.max(...streamData.map((d) => streamFields.reduce((sum, key) => sum + d[key], 0)));

const StreamGraphTemplate = (args) => (
  <XYChart
    data={streamData}
    plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin,
    }}
    height={args.height}
    width={args.width}
    animationDuration={args.animationDuration}
    useCanvas={args.useCanvas}
  >
    <YAxis fields={streamFields} domain={[-maxStreamTotal, maxStreamTotal]} showGridlines={false} />
    <XAxis fields={["year"]} />
    <Areas x="year" ys={streamFields} stacked={true} offset="wiggle" order="insideOut" />
  </XYChart>
);

export const Basic = {
  name: "Basic Plot",
  render: AreaTemplateWithControls,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    color: "#99C1DC",
    theme: "light",
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    y: "sin",
    x: "x",
    y2: undefined,
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

export const Color = {
  name: "Custom Color",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    color: "orange",
  },
};

// Not a Stream Graph - this fills the band between two y-series with a single Area plot. It used
// to be mislabelled "Stream Graph"; the real thing is below, under `StackedAreas`
export const RangeArea = {
  name: "Range Area",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    y2: "cos",
  },
};

export const Canvas = {
  name: "Using Canvas",
  render: AreaTemplateWithControls,
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

export const AreaWithBrush = {
  name: "Area with Brush",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    zoomBrush: "inline",
    bottomMargin: 10,
  },
};

export const MultipleAreas = {
  name: "Mutiple Area Plots",
  render: AreasTemplate,
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

export const MultipleAreasGrouped = {
  name: "Mutiple Area Plots with Grouped Tooltips",
  render: AreasTemplate,
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

export const StackedAreas = {
  name: "Stacked Area Plots",
  render: StackedAreasTemplate,
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

export const StreamGraph = {
  name: "Stream Graph",
  render: StreamGraphTemplate,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    leftMargin: 60,
    rightMargin: 40,
    topMargin: 20,
    bottomMargin: 40,
  },
};

export const StackedAreasWithBrush = {
  name: "Stacked Area Plots with a Brush",
  render: StackedAreasTemplate,
  args: {
    ...Basic.args,
    y: "sin",
    y2: "cos",
    zoomBrush: "inline",
    bottomMargin: 10,
  },
};
