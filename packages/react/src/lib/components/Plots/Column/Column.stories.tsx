import { themes } from "@chart-io/core";

import React from "react";

import { basicData } from "../../../../data/basic";
import { argTypes } from "../../../../storybook/argTypes";
import { createCanvasTest, createSVGTest } from "../../../testUtils";
import { XAxis, YAxis } from "../../Axis";
import { XYChart } from "../../XYChart";
import { Column } from "./Column";
import { Columns } from "./Columns";

import { uniqBy } from "lodash";

const { width, height, useCanvas, theme, color } = argTypes;

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
        onClick: { action: "clicked" },
        onMouseOver: { action: "onMouseOver" },
        onMouseOut: { action: "onMouseOut" },
    },
};

const ColumnTemplate = (args) => (
    <XYChart
        data={basicData}
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
        data={basicData}
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
        y: "sales",
        x: "month",
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
        y2: "revenue",
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
        y2: "revenue",
        stacked: true,
    },
    play: createSVGTest("rect.column", { clientX: 107, clientY: 396 }),
};

export const Grouped = {
    name: "Grouped Columns",
    render: ColumnsTemplate,
    args: {
        ...Basic.args,
        y2: "revenue",
        grouped: true,
    },
    play: createSVGTest("rect.column", { clientX: 107, clientY: 396 }),
};

export const CustomTheme = {
    name: "Custom Theme",
    render: ColumnsTemplate,
    args: {
        ...Basic.args,
        y2: "revenue",
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
