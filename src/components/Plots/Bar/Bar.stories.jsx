import React from "react";

import { argTypes } from "../../../../stories/argTypes";
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { Bar } from "./Bar";
import { Bars } from "./Bars";
import { Chart } from "../../Chart";
import { XAxis, YAxis } from "../../Axis";

import mdx from "./Bar.mdx";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
    title: "XYCharts/Bar",
    component: Bar,
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

const BarTemplate = (args) => (
    <Chart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        ys={[args.y, args.y2, args.y3]}
        xs={[args.x]}
        {...args}
    >
        <YAxis fields={[args.y]} scaleType="band" showGridlines={false} />
        <XAxis fields={[args.x, args.x2, args.x3]} />
        <Bar x={args.x} y={args.y} color={args.color} animationDuration={args.animationDuration} />
        {args.x2 ? (
            <Bar x={args.x2} y={args.y} color={args.color2} animationDuration={args.animationDuration} />
        ) : undefined}
    </Chart>
);

const BarsTemplate = (args) => (
    <Chart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        ys={[args.y, args.y2, args.y3]}
        xs={[args.x]}
        {...args}
    >
        <YAxis fields={[args.y]} scaleType="band" showGridlines={false} />
        <XAxis fields={[args.x, args.x2, args.x3]} aggregate={args.stacked} />
        <Bars
            y={args.y}
            xs={[args.x, args.x2]}
            animationDuration={args.animationDuration}
            grouped={args.grouped}
            stacked={args.stacked}
        />
    </Chart>
);

export const Basic = BarTemplate.bind({});
Basic.storyName = "Basic Plot";
Basic.args = {
    useCanvas: false,
    width: 800,
    height: 400,
    animationDuration: 250,
    color: "#99C1DC",
    color2: "#FF7F28",
    theme: "light",
    leftMargin: 120,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    onClick: console.debug,
    onMouseOver: console.debug,
    onMouseOut: console.debug,
    x: "Unit Price",
    y: "Item Type",
};

export const Color = BarTemplate.bind({});
Color.storyName = "Custom Color";
Color.args = {
    ...Basic.args,
    color: "orange",
};

export const Canvas = BarTemplate.bind({});
Canvas.storyName = "Using Canvas";
Canvas.args = {
    ...Basic.args,
    useCanvas: true,
};

export const Ratio = BarTemplate.bind({});
Ratio.storyName = "Ratio Bars";
Ratio.args = {
    ...Basic.args,
    x2: "Unit Cost",
};

export const Stacked = BarsTemplate.bind({});
Stacked.storyName = "Stacked Bars";
Stacked.args = {
    ...Basic.args,
    x2: "Unit Cost",
    stacked: true,
};

export const Grouped = BarsTemplate.bind({});
Grouped.storyName = "Grouped Bars";
Grouped.args = {
    ...Basic.args,
    x2: "Unit Cost",
    grouped: true,
};
