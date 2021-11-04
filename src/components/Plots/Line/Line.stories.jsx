import React from "react";

import { argTypes } from "../../../../stories/argTypes";
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { Line } from "./Line";
import { Lines } from "./Lines";
import { Chart } from "../../Chart";
import { XAxis, YAxis } from "../../Axis";

import mdx from "./Line.mdx";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
    title: "XYCharts/Line",
    component: Line,
    parameters: {
        docs: {
            page: mdx,
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
    },
};

const LineTemplate = (args) => (
    <Chart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        ys={[args.y, args.y2, args.y3]}
        xs={[args.x]}
        {...args}
    >
        <Line x={args.x} y={args.y} color={args.color} animationDuration={args.animationDuration} />
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} />
    </Chart>
);

const LinesTemplate = (args) => (
    <Chart
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        data={sales_records_dataset}
        {...args}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} />
        <Lines x={args.x} ys={[args.y, args.y2, args.y3]} animationDuration={args.animationDuration} />
    </Chart>
);

export const Basic = LineTemplate.bind({});
Basic.storyName = "Basic Plot";
Basic.args = {
    useCanvas: false,
    width: 500,
    height: 400,
    animationDuration: 250,
    color: "#99C1DC",
    theme: "light",
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    onClick: console.debug,
    onMouseOver: console.debug,
    onMouseOut: console.debug,
    y: "Total Profit",
    x: "Order Date",
};

export const Color = LineTemplate.bind({});
Color.storyName = "Custom Color";
Color.args = {
    ...Basic.args,
    color: "orange",
};

export const Canvas = LineTemplate.bind({});
Canvas.storyName = "Using Canvas";
Canvas.args = {
    ...Basic.args,
    useCanvas: true,
};

export const MultipleLines = LinesTemplate.bind({});
MultipleLines.storyName = "Mutiple Line Plots";
MultipleLines.args = {
    ...Basic.args,
    y2: "Total Revenue",
    y3: "Total Cost",
};
