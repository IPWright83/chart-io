import React from "react";

import { argTypes } from "../../../../storybook/argTypes";
import { example_dataset } from "../../../../data/example_dataset";
import { Line } from "./Line";
import { Lines } from "./Lines";
import { Scatter } from "../Scatter";
import { XYChart } from "../../XYChart";
import { XAxis, YAxis } from "../../Axis";

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

const processData = (rawData) => {
    const keyField = "Month";

    const aggregated = rawData
        .filter((r) => ["Aperture", "Black Mesa"].includes(r.Owner))
        .reduce((result, value) => {
            const current = result[value[keyField]] || {};

            for (let field in value) {
                if (typeof value[field] === "number") {
                    current[field] = current[field] || 0;
                    current[field] += value[field];
                } else {
                    current[field] = value[field];
                }
            }

            result[value[keyField]] = current;
            return result;
        }, {});

    const result = Object.keys(aggregated).flatMap((key) => ({
        [keyField]: new Date(key),
        ...aggregated[key],
    }));

    return result;
};

const LineTemplate = (args) => (
    <XYChart
        data={processData(example_dataset)}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
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
        <Line x={args.x} y={args.y} color={args.color} interactive={!args.withScatter} />
        {args.withScatter ? <Scatter x={args.x} y={args.y} /> : null}
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} />
    </XYChart>
);

const LinesTemplate = (args) => (
    <XYChart
        data={processData(example_dataset)}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
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
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} />
        <Lines x={args.x} ys={[args.y, args.y2, args.y3]} />
    </XYChart>
);

export const Basic = LineTemplate.bind({});
Basic.storyName = "Basic Plot";
Basic.args = {
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
    y: "Unit Sales",
    x: "Month",
};

export const LineWithPoints = LineTemplate.bind({});
LineWithPoints.storyName = "Line with Points";
LineWithPoints.args = {
    ...Basic.args,
    withScatter: true,
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

export const LineWithBrush = LineTemplate.bind({});
LineWithBrush.storyName = "Line with Brush";
LineWithBrush.args = {
    ...Basic.args,
    withScatter: true,
    zoomBrush: "inline",
};

export const MultipleLines = LinesTemplate.bind({});
MultipleLines.storyName = "Mutiple Line Plots";
MultipleLines.args = {
    ...Basic.args,
    y: "Operating Profit",
    y2: "Sales Value",
    y3: "Gross Profit",
    withBrush: true,
};
