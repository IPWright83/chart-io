import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../data/gdp_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { createCanvasTest, createSVGTest } from "../../testUtils";
import { Treemap } from "./Treemap";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Plots/Treemap",
    component: Treemap,
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
} as Meta<typeof Treemap>;

const data = gdp_dataset;

// Split each row's GDP across two halves of the year, purely to demonstrate that `categories`
// supports more than the 2-3 levels shown above - any number of fields can be chained together
const fourLevelData = gdp_dataset.flatMap((d) => [
    { ...d, half: "H1", gdp: Math.round(d.gdp * 0.45) },
    { ...d, half: "H2", gdp: Math.round(d.gdp * 0.55) },
]);

const TreemapTemplate = (args) => (
    <Treemap
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
        categories={args.categories}
        value={args.value}
        sort={args.sort}
        padding={args.padding}
    />
);

export const Basic = {
    name: "Basic Plot",
    render: TreemapTemplate,
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
        sort: true,
        padding: 2,
    },
    play: createSVGTest("rect.treemap-cell", { clientX: 150, clientY: 150 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: TreemapTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 150, clientY: 150 }),
};

export const ThreeLevel = {
    name: "3-level Treemap",
    render: TreemapTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
    },
    play: createSVGTest("rect.treemap-cell", { clientX: 150, clientY: 150 }),
};

export const DeepTreemap = {
    name: "4-level Treemap",
    render: TreemapTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector", "half"],
        data: fourLevelData,
    },
    play: createSVGTest("rect.treemap-cell", { clientX: 150, clientY: 150 }),
};

export const Zoomable = {
    name: "Zoomable with Breadcrumb",
    render: TreemapTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
        zoomable: true,
        breadcrumb: true,
    },
    play: createSVGTest("rect.treemap-cell", { clientX: 150, clientY: 150 }),
};
