import React from "react";

import { argTypes } from "../../../../storybook/argTypes";
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { Area } from "./Area";
import { Areas } from "./Areas";
import { XYChart } from "../../XYChart";
import { XAxis, YAxis } from "../../Axis";

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

const AreaTemplate = (args) => (
    <XYChart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        height={args.height}
        width={args.width}
        animationDuration={args.animationDuration}
        useCanvas={args.useCanvas}
    >
        <Area x={args.x} y={args.y} y2={args.y2} color={args.color} />
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} />
    </XYChart>
);

const AreasTemplate = (args) => (
    <XYChart
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        data={sales_records_dataset}
        height={args.height}
        width={args.width}
        animationDuration={args.animationDuration}
        useCanvas={args.useCanvas}
        theme={args.theme}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} />
        <Areas x={args.x} ys={[args.y, args.y2, args.y3]} />
    </XYChart>
);

const StackedAreasTemplate = (args) => (
    <XYChart
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        data={sales_records_dataset}
        height={args.height}
        width={args.width}
        animationDuration={args.animationDuration}
        theme={args.theme}
        useCanvas={args.useCanvas}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} aggregate={true} />
        <XAxis fields={[args.x]} />
        <Areas x={args.x} ys={[args.y, args.y2, args.y3]} stacked={true} />
    </XYChart>
);

export const Basic = AreaTemplate.bind({});
Basic.storyName = "Basic Plot";
Basic.args = {
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
