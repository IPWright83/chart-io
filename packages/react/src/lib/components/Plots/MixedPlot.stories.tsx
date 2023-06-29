import React from "react";

import { argTypes } from "../../../storybook/argTypes";
import { example_dataset } from "../../../data/example_dataset";
import { Line } from "./Line";
import { Column, Columns } from "./Column";
import { XYChart } from "../XYChart";
import { XAxis, YAxis } from "../Axis";
import { Area } from "./Area";
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

const MixedLineAreaScatterTemplate = (args) => (
    <XYChart
        data={processData(example_dataset)}
        plotMargin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
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
        <Line x={args.x} y={args.y} color="steelblue" />
        <Area x={args.x} y={args.y4} color="green" />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} showGridlines={false} />
        <XAxis fields={[args.x]} showGridlines={false} />
    </XYChart>
);

const MixedScaleBandTemplate = (args) => (
    <XYChart
        data={processData(example_dataset)}
        plotMargin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
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
        <Area x={args.x} y={args.y4} color="green" />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} showGridlines={false} />
        <XAxis fields={[args.x]} scaleType="band" showGridlines={false} />
    </XYChart>
);

const MixedColumnPlotTemplate = (args) => (
    <XYChart
        data={processData(example_dataset)}
        plotMargin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
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
        <Area x={args.x} y={args.y4} color="green" />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} showGridlines={false} />
        <XAxis fields={[args.x]} showGridlines={false} />
    </XYChart>
);

const MixedGroupledColumnPlotTemplate = (args) => (
    <XYChart
        data={processData(example_dataset)}
        plotMargin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
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
        <Columns x={args.x} ys={[args.y, args.y4, args.y2]} grouped={args.grouped} stacked={args.stacked} />
        <Scatter x={args.x} y={args.y3} color="purple" />
        <YAxis fields={[args.y, args.y2, args.y3, args.y4]} aggregate={args.stacked} showGridlines={false} />
        <XAxis fields={[args.x]} showGridlines={false} />
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
    y: "Gross Profit",
    y2: "Sales Value",
    y3: "Operating Profit",
    y4: "Unit Sales",
    x: "Month",
};

export const MixedScaleBand = MixedScaleBandTemplate.bind({});
MixedScaleBand.storyName = "Mixing Cintinuous Plots with a Band scale";
MixedScaleBand.args = {
    ...MixedLineAreaScatter.args,
};

export const MixedColumnPlots = MixedColumnPlotTemplate.bind({});
MixedColumnPlots.storyName = "Column, Line, Area & Scatter";
MixedColumnPlots.args = {
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
    y: "Gross Profit",
    y2: "Sales Value",
    y3: "Operating Profit",
    y4: "Unit Sales",
    x: "Month",
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
    y: "Gross Profit",
    y2: "Sales Value",
    y3: "Operating Profit",
    y4: "Unit Sales",
    x: "Month",
    grouped: true,
    stacked: false,
};

export const MixedStackedColumnPlots = MixedGroupledColumnPlotTemplate.bind({});
MixedStackedColumnPlots.storyName = "Stacked Column & Scatter";
MixedStackedColumnPlots.args = {
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
    y: "Gross Profit",
    y2: "Sales Value",
    y3: "Operating Profit",
    y4: "Unit Sales",
    x: "Month",
    grouped: false,
    stacked: true,
};
