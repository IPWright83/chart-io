import React from "react";

import { argTypes } from "../../../../storybook/argTypes";
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { huge_data_set } from "../../../../data/huge_data_set";
import { Scatter } from "./Scatter";
import { Scatters } from "./Scatters";
import { XYChart } from "../../XYChart";
import { XAxis, YAxis } from "../../Axis";
import { createSVGTest, createCanvasTest } from "../../../testUtils";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
  title: "XYCharts/Scatter",
  component: Scatter,
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
    radius: {
      description: "The radius of the points on the chart",
      control: { type: "range", min: 1, max: 100 },
      defaultValue: { summary: 5 },
    },
    onClick: { action: "clicked" },
    onMouseOver: { action: "onMouseOver" },
    onMouseOut: { action: "onMouseOut" },
  },
};

const ScatterTemplate = (args) => (
  <XYChart
    data={args.data}
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
  >
    <YAxis fields={[args.y, args.y2, args.y3]} />
    <XAxis fields={[args.x]} />
    <Scatter
      x={args.x}
      y={args.y}
      radius={args.radius}
      color={args.color}
      noClip
    />
  </XYChart>
);

const ScattersTemplate = (args) => (
  <XYChart
    plotMargin={{
      left: args.leftMargin,
      right: args.rightMargin,
      top: args.topMargin,
      bottom: args.bottomMargin,
    }}
    data={sales_records_dataset}
    width={args.width}
    height={args.height}
    animationDuration={args.animationDuration}
    theme={args.theme}
    useCanvas={args.useCanvas}
    onClick={args.onClick}
    onMouseOver={args.onMouseOver}
    onMouseOut={args.onMouseOut}
  >
    <YAxis fields={[args.y, args.y2, args.y3]} />
    <XAxis fields={[args.x]} />
    <Scatters x={args.x} ys={[args.y, args.y2, args.y3]} radius={args.radius} />
  </XYChart>
);

export const Basic = {
  name: "Basic Plot",
  render: ScatterTemplate,
  args: {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 250,
    color: "#99C1DC",
    theme: "light",
    radius: 5,
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    data: sales_records_dataset,
    y: "Total Profit",
    x: "Units Sold",
  },
  play: createSVGTest("circle", { clientX: 773, clientY: 227 }),
};

export const Radius = {
  name: "Custom Radius",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    radius: 15,
  },
};

export const Color = {
  name: "Custom Color",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    color: "orange",
  },
};

export const Canvas = {
  name: "Using Canvas",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    useCanvas: true,
  },
  play: createCanvasTest({ clientX: 773, clientY: 227 }),
};

export const MultipleScatter = {
  name: "Mutiple Scatter Plots",
  render: ScattersTemplate,
  args: {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost",
  },
};

export const MultipleScatterCanvas = {
  name: "Mutiple Scatter Plots using Canvas",
  render: ScattersTemplate,
  args: {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost",
    useCanvas: true,
  },
};

export const ProgresssiveRendering = {
  name: "Progressive Rendering large datasets",
  render: ScatterTemplate,
  args: {
    ...Basic.args,
    animationDuration: 0,
    data: huge_data_set,
    height: 500,
    useCanvas: true,
    radius: 3,
    width: 800,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
