import React from "react";

import { argTypes } from "../../../../stories/argTypes";
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { Column } from "./Column";
import { Columns } from "./Columns";
import { Chart } from "../../Chart";
import { XAxis, YAxis } from "../../Axis";

import mdx from "./Column.mdx";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
    title: "XYCharts/Column",
    component: Column,
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

const ColumnTemplate = (args) => (
    <Chart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        ys={[args.y, args.y2, args.y3]}
        xs={[args.x]}
        {...args}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} scaleType="band" showGridlines={false} />
        <Column x={args.x} y={args.y} color={args.color} animationDuration={args.animationDuration} />
        {args.y2 ? (
            <Column x={args.x} y={args.y2} color={args.color2} animationDuration={args.animationDuration} />
        ) : undefined}
    </Chart>
);

const ColumnsTemplate = (args) => (
    <Chart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        ys={[args.y, args.y2, args.y3]}
        xs={[args.x]}
        {...args}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} aggregate={args.stacked} />
        <XAxis fields={[args.x]} scaleType="band" showGridlines={false} />
        <Columns
            x={args.x}
            ys={[args.y, args.y2]}
            animationDuration={args.animationDuration}
            grouped={args.grouped}
            stacked={args.stacked}
        />
    </Chart>
);

export const Basic = ColumnTemplate.bind({});
Basic.storyName = "Basic Plot";
Basic.args = {
    useCanvas: false,
    width: 800,
    height: 400,
    animationDuration: 250,
    color: "#99C1DC",
    color2: "#FF7F28",
    theme: "light",
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    onClick: console.debug,
    onMouseOver: console.debug,
    onMouseOut: console.debug,
    y: "Unit Price",
    x: "Item Type",
};

export const Color = ColumnTemplate.bind({});
Color.storyName = "Custom Color";
Color.args = {
    ...Basic.args,
    color: "orange",
};

export const Canvas = ColumnTemplate.bind({});
Canvas.storyName = "Using Canvas";
Canvas.args = {
    ...Basic.args,
    useCanvas: true,
};

export const Ratio = ColumnTemplate.bind({});
Ratio.storyName = "Ratio Columns";
Ratio.args = {
    ...Basic.args,
    y2: "Unit Cost",
};

export const Stacked = ColumnsTemplate.bind({});
Stacked.storyName = "Stacked Columns";
Stacked.args = {
    ...Basic.args,
    y2: "Unit Cost",
    stacked: true,
};

export const Grouped = ColumnsTemplate.bind({});
Grouped.storyName = "Grouped Columns";
Grouped.args = {
    ...Basic.args,
    y2: "Unit Cost",
    grouped: true,
};