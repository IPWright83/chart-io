import type { Meta } from "@storybook/react";
import { expect, fn, within } from "@storybook/test";
import React, { useMemo } from "react";

import { waves } from "../../../../data/waves";
import { argTypes } from "../../../../storybook/argTypes";
import { createEventReceiverTest } from "../../../testUtils";
import { XAxis, YAxis } from "../../Axis";
import { XYChart } from "../../XYChart";
import { Area } from "./Area";
import { Areas } from "./Areas";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
  title: "XYCharts/Area",
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
    data={waves}
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

export const Basic = {
  name: "Basic Plot",
  render: AreaTemplate,
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

export const Stream = {
  name: "Stream Graph",
  render: AreaTemplate,
  args: {
    ...Basic.args,
    y2: "cos",
  },
};

export const Canvas = {
  name: "Using Canvas",
  render: AreaTemplate,
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
