import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../data/gdp_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { createSVGTest } from "../../testUtils";
import { RectangularChart } from "../RectangularChart";
import { CirclePacking } from "./CirclePacking";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Plots/CirclePacking",
    component: CirclePacking,
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
} as Meta<typeof CirclePacking>;

const data = gdp_dataset;

const CirclePackingTemplate = (args) => (
    <RectangularChart
        data={args.data ?? data}
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
        zoomable={args.zoomable}
        breadcrumb={args.breadcrumb}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <CirclePacking categories={args.categories} value={args.value} sort={args.sort} />
    </RectangularChart>
);

export const Basic = {
    name: "Basic Plot",
    render: CirclePackingTemplate,
    args: {
        useCanvas: false,
        width: 600,
        height: 600,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 40,
        rightMargin: 40,
        topMargin: 40,
        bottomMargin: 40,
        categories: ["continent", "country"],
        value: "gdp",
        sort: true,
    },
    play: createSVGTest("circle.circle-packing-node", { clientX: 150, clientY: 300 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: CirclePackingTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
};

export const ThreeLevel = {
    name: "3-level Circle Packing",
    render: CirclePackingTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
    },
    play: createSVGTest("circle.circle-packing-node", { clientX: 150, clientY: 300 }),
};

export const Zoomable = {
    name: "Zoomable with Breadcrumb",
    render: CirclePackingTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
        zoomable: true,
        breadcrumb: true,
    },
    play: createSVGTest("circle.circle-packing-node", { clientX: 150, clientY: 300 }),
};
