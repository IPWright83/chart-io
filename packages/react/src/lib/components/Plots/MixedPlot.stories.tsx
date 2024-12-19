import React from "react";
import * as d3 from "@chart-io/d3";

import { argTypes } from "../../../storybook/argTypes";
import { waves } from "../../../data/waves";
import { Line } from "./Line";
import { Column, Columns } from "./Column";
import { XYChart } from "../XYChart";
import { XAxis, YAxis } from "../Axis";
import { Area, Areas } from "./Area";
import { Scatter } from "./Scatter";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
  title: "XYCharts/MixedPlots",
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
    onClick: { action: "clicked" },
    onMouseOver: { action: "onMouseOver" },
    onMouseOut: { action: "onMouseOut" },
  },
};

const MixedLineAreaScatterTemplate = (args) => (
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
    <Area x={args.x} y={args.y2} />
    <Line x={args.x} y={args.y} color="steelblue" />
    <Scatter x={args.x} y={args.y} color="steelblue" />
    <YAxis fields={[args.y, args.y2]} showGridlines={false} />
    <XAxis fields={[args.x]} showGridlines={false} />
  </XYChart>
);

const MixedScaleBandTemplate = (args) => (
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
    <Column x={args.x} y={args.y2} color="orange" />
    <Line x={args.x} y={args.y} color="steelblue" />
    <Scatter x={args.x} y={args.y} color="steelblue" />
    <Scatter x={args.x} y={args.y2} color="orange" />
    <YAxis fields={[args.y, args.y2]} showGridlines={false} />
    <XAxis fields={[args.x]} scaleType="band" showGridlines={false} />
  </XYChart>
);

const MixedColumnPlotNonBandTemplate = (args) => (
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
    <Column x={args.x} y={args.y} color="orange" />
    <Line x={args.x} y={args.y2} color="steelblue" />
    <Scatter x={args.x} y={args.y} color="orange" />
    <Scatter x={args.x} y={args.y2} color="steelblue" />
    <YAxis fields={[args.y, args.y2]} showGridlines={false} />
    <XAxis fields={args.x} showGridlines={false} />
  </XYChart>
);

const MixedColumnPlotTemplate = (args) => (
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
    <Column x={args.x} y={args.y} color="orange" />
    <Line x={args.x} y={args.y2} color="steelblue" />
    <Scatter x={args.x} y={args.y} color="orange" />
    <Scatter x={args.x} y={args.y2} color="steelblue" />
    <YAxis fields={[args.y, args.y2]} showGridlines={false} />
    <XAxis
      fields={args.x}
      scaleType="band"
      showGridlines={false}
    />
  </XYChart>
);

const MixedGroupledColumnPlotTemplate = (args) => (
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
    <Areas x={args.x} ys={[args.y, args.y2]} stacked={args.stacked} />
    <Columns
      x={args.x}
      ys={[args.y, args.y2]}
      grouped={args.grouped}
      stacked={args.stacked}
    />
    <Scatter x={args.x} y={args.y2} color="steelblue" />
    <YAxis
      fields={[args.y, args.y2, args.y3, args.y4]}
      aggregate={args.stacked}
      showGridlines={false}
    />
    <XAxis
      fields={[args.x]}
      showGridlines={false}
      scaleType="band"
    />
  </XYChart>
);

export const MixedLineAreaScatter = MixedLineAreaScatterTemplate.bind({});
MixedLineAreaScatter.storyName = "Mixed Continuous Plots";
MixedLineAreaScatter.args = {
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
  y2: "cos",
  x: "x",
};

export const MixedScaleBand = MixedScaleBandTemplate.bind({});
MixedScaleBand.storyName = "Mixing Continuous Plots with a Band scale";
MixedScaleBand.args = {
  ...MixedLineAreaScatter.args,
};

export const MixedColumnPlotsLinear = MixedColumnPlotNonBandTemplate.bind({});
MixedColumnPlotsLinear.storyName =
  "Mixing Discrete Plots using a Linear Scale";
MixedColumnPlotsLinear.args = {
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
  y2: "cos",
  x: "x",
};

export const MixedGroupedColumnPlots = MixedGroupledColumnPlotTemplate.bind({});
MixedGroupedColumnPlots.storyName = "Groupled Column & Scatter";
MixedGroupedColumnPlots.args = {
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
  y2: "cos",
  x: "x",
  grouped: true,
  stacked: false,
};
