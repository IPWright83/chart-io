import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { argTypes } from "../../../../storybook/argTypes";
import { createCanvasTest, createSVGTest } from "../../../testUtils";
import { PieChart } from "../../PieChart";
import { Donut } from "./Donut";
import { Pie } from "./Pie";

import { uniqBy } from "lodash";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "PieCharts/Pie",
    component: Pie,
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
    args: {
        onClick: fn(),
        onMouseOver: fn(),
        onMouseOut: fn(),
    },
    argTypes: {
        useCanvas,
        width,
        height,
        theme,
        leftMargin: margin,
        rightMargin: margin,
        topMargin: margin,
        bottomMargin: margin,
    },
} as Meta<typeof Pie>;

const data = uniqBy(sales_records_dataset, (d) => d["Item Type"]);

const PieTemplate = (args) => (
    <PieChart
        data={data}
        plotMargin={{
            left: args.leftMargin,
            right: args.rightMargin,
            top: args.topMargin,
            bottom: args.bottomMargin,
        }}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
        theme={args.theme}
        useCanvas={args.useCanvas}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <Pie x={args.x} y={args.y} sort={args.sort} />
    </PieChart>
);

const DonutTemplate = (args) => (
    <PieChart
        data={data}
        plotMargin={{
            left: args.leftMargin,
            right: args.rightMargin,
            top: args.topMargin,
            bottom: args.bottomMargin,
        }}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
        theme={args.theme}
        useCanvas={args.useCanvas}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <Donut x={args.x} y={args.y} />
    </PieChart>
);

export const Basic = {
    name: "Basic Plot",
    render: PieTemplate,
    args: {
        useCanvas: false,
        width: 800,
        height: 500,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 40,
        rightMargin: 40,
        topMargin: 40,
        bottomMargin: 40,
        x: "Item Type",
        y: "Unit Price",
    },
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: PieTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 300, clientY: 250 }),
};

export const AsDonut = {
    name: "Donut",
    render: DonutTemplate,
    args: {
        ...Basic.args,
    },
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};

export const Sorted = {
    name: "Sorted Slices",
    render: PieTemplate,
    args: {
        ...Basic.args,
        sort: true,
    },
};
