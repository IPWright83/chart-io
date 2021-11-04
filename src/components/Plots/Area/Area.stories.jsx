import React from "react";

import { argTypes } from "../../../../stories/argTypes";
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { Area } from "./Area";
import { Areas } from "./Areas";
import { Chart } from "../../Chart";
import { XAxis, YAxis } from "../../Axis";

import mdx from "./Area.mdx";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
    title: "XYCharts/Area",
    component: Area,
    parameters: {
        docs: {
            page: mdx,
            transformSource: (src) => {
                src = src.replace(/No Display Name/, "Chart");
                src = src.replace(/No Display Name/, "Chart");
                src = src.replace(/data={\[.*?\]}/gs, "data={[ ...dataset ]}");
                src = src.replace(/leftMargin={.*?}/gs, "\r");
                src = src.replace(/rightMargin={.*?}/gs, "");
                src = src.replace(/topMargin={.*?}/gs, "");
                src = src.replace(/bottomMargin={.*?}/gs, "");
                src = src.replace(/x=".*?"/gs, "");
                src = src.replace(/x2=".*?"/gs, "");
                src = src.replace(/x3=".*?"/gs, "");
                src = src.replace(/y=".*?"/gs, "");
                src = src.replace(/y2=".*?"/gs, "");
                src = src.replace(/y3=".*?"/gs, "");
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
    },
};

const AreaTemplate = (args) => (
    <Chart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        ys={[args.y, args.y2, args.y3]}
        xs={[args.x]}
        {...args}
    >
        <Area x={args.x} y={args.y} y2={args.y2} color={args.color} animationDuration={args.animationDuration} />
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} />
    </Chart>
);

const AreasTemplate = (args) => (
    <Chart
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        data={sales_records_dataset}
        {...args}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} />
        <Areas x={args.x} ys={[args.y, args.y2, args.y3]} animationDuration={args.animationDuration} />
    </Chart>
);

const StackedAreasTemplate = (args) => (
    <Chart
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        data={sales_records_dataset}
        {...args}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} aggregate={true} />
        <XAxis fields={[args.x]} />
        <Areas x={args.x} ys={[args.y, args.y2, args.y3]} stacked={true} animationDuration={args.animationDuration} />
    </Chart>
);

export const Basic = AreaTemplate.bind({});
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
    y2: undefined,
};

export const Color = AreaTemplate.bind({});
Color.storyName = "Custom Color";
Color.args = {
    ...Basic.args,
    color: "orange",
};

export const Stream = AreaTemplate.bind({});
Stream.storyName = "Stream Graph";
Stream.args = {
    ...Basic.args,
    y2: "Total Cost",
};

export const Canvas = AreaTemplate.bind({});
Canvas.storyName = "Using Canvas";
Canvas.args = {
    ...Basic.args,
    useCanvas: true,
};

export const MultipleAreas = AreasTemplate.bind({});
MultipleAreas.storyName = "Mutiple Area Plots";
MultipleAreas.args = {
    ...Basic.args,
    y: "Total Revenue",
    y2: "Total Cost",
    y3: "Total Profit",
};

export const StackedAreas = StackedAreasTemplate.bind({});
StackedAreas.storyName = "Stacked Area Plots";
StackedAreas.args = {
    ...Basic.args,
    y: "Total Revenue",
    y2: "Total Cost",
    y3: "Total Profit",
};
