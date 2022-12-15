import React from "react";

import { argTypes } from "../../../stories/argTypes";
// @ts-ignore Ignore sample data
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
// @ts-ignore Ignore sample data
import { huge_data_set } from "../../../../data/huge_data_set";
import { Scatter } from "./Scatter";
import { Scatters } from "./Scatters";
import { XYChart } from "../../XYChart";
import { XAxis, YAxis } from "../../Axis";

import mdx from "./Scatter.mdx";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
    title: "XYCharts/Scatter",
    component: Scatter,
    parameters: {
        docs: {
            page: mdx,
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
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
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
        <Scatter x={args.x} y={args.y} radius={args.radius} color={args.color} />
    </XYChart>
);

const ScattersTemplate = (args) => (
    <XYChart
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
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

export const Basic = ScatterTemplate.bind({});
Basic.storyName = "Basic Plot";
Basic.args = {
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
};

export const Radius = ScatterTemplate.bind({});
Radius.storyName = "Custom Radius";
Radius.args = {
    ...Basic.args,
    radius: 15,
};

export const Color = ScatterTemplate.bind({});
Color.storyName = "Custom Color";
Color.args = {
    ...Basic.args,
    color: "orange",
};

export const Canvas = ScatterTemplate.bind({});
Canvas.storyName = "Using Canvas";
Canvas.args = {
    ...Basic.args,
    useCanvas: true,
};

export const MultipleScatter = ScattersTemplate.bind({});
MultipleScatter.storyName = "Mutiple Scatter Plots";
MultipleScatter.args = {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost",
};

export const MultipleScatterCanvas = ScattersTemplate.bind({});
MultipleScatterCanvas.storyName = "Mutiple Scatter Plots using Canvas";
MultipleScatterCanvas.args = {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost",
    useCanvas: true,
};

export const ProgresssiveRendering = ScatterTemplate.bind({});
ProgresssiveRendering.storyName = "Progressive Rendering large datasets";
ProgresssiveRendering.args = {
    ...Basic.args,
    animationDuration: 0,
    data: huge_data_set,
    height: 250,
    useCanvas: true,
    radius: 3,
    width: 400,
};
ProgresssiveRendering.parameters = {
    chromatic: { delay: 3000 },
};
