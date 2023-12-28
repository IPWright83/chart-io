import { themes } from "@chart-io/core";

import React from "react";

import { argTypes } from "../../../../storybook/argTypes";
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { Column } from "./Column";
import { Columns } from "./Columns";
import { XYChart } from "../../XYChart";
import { XAxis, YAxis } from "../../Axis";
import { createSVGTest, createCanvasTest } from "../../../testUtils";

import { uniqBy } from "lodash";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
    title: "XYCharts/Column",
    component: Column,
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

const data = uniqBy(sales_records_dataset, (d) => d["Item Type"]);

const ColumnTemplate = (args) => (
    <XYChart
        data={data}
        plotMargin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
        useCanvas={args.useCanvas}
        theme={args.theme}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} />
        <XAxis fields={[args.x]} scaleType="band" showGridlines={false} />
        <Column x={args.x} y={args.y} color={args.color} />
        {args.y2 && <Column x={args.x} y={args.y2} color={args.color2} />}
    </XYChart>
);

const ColumnsTemplate = (args) => (
    <XYChart
        data={data}
        plotMargin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
        useCanvas={args.useCanvas}
        theme={args.theme}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <YAxis fields={[args.y, args.y2, args.y3]} aggregate={args.stacked} />
        <XAxis fields={[args.x]} scaleType="band" showGridlines={false} />
        <Columns x={args.x} ys={[args.y, args.y2]} grouped={args.grouped} stacked={args.stacked} />
    </XYChart>
);

export const Basic = {
    name: "Basic Plot",
    render: ColumnTemplate,
    args: {
        useCanvas: false,
        width: 800,
        height: 500,
        animationDuration: 250,
        color: "#99C1DC",
        color2: "#fc998e",
        leftMargin: 70,
        rightMargin: 40,
        topMargin: 40,
        bottomMargin: 40,
        y: "Unit Price",
        x: "Item Type",
    },
    play: createSVGTest("rect.column", { clientX: 107, clientY: 396 }),
};

export const Color = {
    name: "Custom Color",
    render: ColumnTemplate,
    args: {
        ...Basic.args,
        color: "orange",
    },
};

export const Canvas = {
    name: "Using Canvas",
    render: ColumnTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 107, clientY: 396 }),
};

export const Ratio = {
    name: "Ratio Columns",
    render: ColumnTemplate,
    args: {
        ...Basic.args,
        y2: "Unit Cost",
        theme: {
            ...themes.light,
            series: {
                ...themes.light.series,
                opacity: 1,
            },
        },
    },
};

export const Stacked = {
    name: "Stacked Columns",
    render: ColumnsTemplate,
    args: {
        ...Basic.args,
        y2: "Unit Cost",
        stacked: true,
    },
    play: createSVGTest("rect.column", { clientX: 107, clientY: 396 }),
};

export const Grouped = {
    name: "Grouped Columns",
    render: ColumnsTemplate,
    args: {
        ...Basic.args,
        y2: "Unit Cost",
        grouped: true,
    },
    play: createSVGTest("rect.column", { clientX: 107, clientY: 396 }),
};

export const CustomTheme = {
    name: "Custom Theme",
    render: ColumnsTemplate,
    args: {
        ...Basic.args,
        y2: "Unit Cost",
        grouped: true,
        theme: {
            ...themes.dark,
            background: "#F3F1E5",
            axis: {
                stroke: "#969495",
            },
            gridlines: {
                stroke: "#969495",
            },
            colors: ["#2FC2AF", "#433F3E"],
        },
    },
};
