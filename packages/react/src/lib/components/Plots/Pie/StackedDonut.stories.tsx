import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../../data/gdp_dataset";
import { argTypes } from "../../../../storybook/argTypes";
import { createCanvasTest, createSVGTest } from "../../../testUtils";
import { RadialChart } from "../../RadialChart";
import { StackedDonut } from "./StackedDonut";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "RadialCharts/StackedDonut",
    component: StackedDonut,
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
} as Meta<typeof StackedDonut>;

const data = gdp_dataset;

const StackedDonutTemplate = (args) => (
    <RadialChart
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
        centerValue={args.centerValue}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <StackedDonut categories={args.categories} value={args.value} sort={args.sort} />
    </RadialChart>
);

export const Basic = {
    name: "Basic Plot",
    render: StackedDonutTemplate,
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
        categories: ["continent", "country"],
        value: "gdp",
    },
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: StackedDonutTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 300, clientY: 250 }),
};

export const Sunburst = {
    name: "N-level Sunburst",
    render: StackedDonutTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
    },
};

export const CenterValue = {
    name: "Center Value",
    render: StackedDonutTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
        centerValue: true,
    },
};
