import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { argTypes } from "../../../storybook/argTypes";
import { jitterFields, withDataControls } from "../../../storybook/dataControls";
import { createCanvasTest, createSVGTest } from "../../testUtils";
import { Funnel } from "./Funnel";
import { Pyramid } from "./Funnel/Pyramid";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/Funnel/Funnel",
    component: Funnel,
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
} as Meta<typeof Funnel>;

// A classic sales/conversion funnel - each stage narrower than the one before it
const data = [
    { stage: "Website Visits", count: 12000 },
    { stage: "Product Views", count: 6400 },
    { stage: "Added to Cart", count: 2300 },
    { stage: "Checkout Started", count: 1200 },
    { stage: "Purchases", count: 640 },
];

const unsortedData = [
    { stage: "Added to Cart", count: 2300 },
    { stage: "Website Visits", count: 12000 },
    { stage: "Purchases", count: 640 },
    { stage: "Product Views", count: 6400 },
    { stage: "Checkout Started", count: 1200 },
];

const funnelDataControls = {
    initialData: data,
    randomize: (row: (typeof data)[number]) => jitterFields(row, ["count"], 0.2),
    // Every stage in the source dataset is already represented - clone a random one under a
    // synthetic label instead, so the chart still gains a visibly new segment
    createPoint: (current: typeof data) => {
        const base = current[Math.floor(Math.random() * current.length)];
        return jitterFields({ ...base, stage: `${base.stage} (New)` }, ["count"], 0.2);
    },
    minLength: 2,
};

const FunnelTemplate = (args) => (
    <Funnel
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
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
        category={args.category}
        value={args.value}
        sort={args.sort}
        padding={args.padding}
    />
);

const FunnelTemplateWithControls = withDataControls(FunnelTemplate, funnelDataControls);

const PyramidTemplate = (args) => (
    <Pyramid
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
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
        category={args.category}
        value={args.value}
        sort={args.sort}
        padding={args.padding}
    />
);

export const Basic = {
    name: "Basic Plot",
    render: FunnelTemplateWithControls,
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
        category: "stage",
        value: "count",
        sort: true,
        padding: 2,
    },
    play: createSVGTest("polygon.funnel-segment", { clientX: 400, clientY: 150 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: FunnelTemplateWithControls,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 400, clientY: 150 }),
};

export const AsPyramid = {
    name: "Pyramid",
    render: PyramidTemplate,
    args: {
        ...Basic.args,
    },
    play: createSVGTest("polygon.funnel-segment", { clientX: 400, clientY: 150 }),
};

export const CustomOrder = {
    name: "Preserving Data Order",
    render: FunnelTemplate,
    args: {
        ...Basic.args,
        data: unsortedData,
        sort: false,
    },
    play: createSVGTest("polygon.funnel-segment", { clientX: 400, clientY: 150 }),
};
