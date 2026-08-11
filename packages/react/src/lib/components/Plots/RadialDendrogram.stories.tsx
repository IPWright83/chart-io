import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../data/gdp_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { createSVGTest } from "../../testUtils";
import { RadialDendrogram } from "./RadialDendrogram";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "RadialCharts/RadialDendrogram",
    component: RadialDendrogram,
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
} as Meta<typeof RadialDendrogram>;

const data = gdp_dataset;

const RadialDendrogramTemplate = (args) => (
    <RadialDendrogram
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
    />
);

export const Basic = {
    name: "Basic Plot",
    render: RadialDendrogramTemplate,
    args: {
        useCanvas: false,
        width: 700,
        height: 700,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 60,
        rightMargin: 60,
        topMargin: 60,
        bottomMargin: 60,
        categories: ["continent", "country"],
        value: "gdp",
        sort: true,
        zoomable: false,
        breadcrumb: false,
    },
    play: createSVGTest("circle.radial-dendrogram-node", { clientX: 447, clientY: 285 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: RadialDendrogramTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
};

export const ThreeLevel = {
    name: "3-level Radial Dendrogram",
    render: RadialDendrogramTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
    },
    play: createSVGTest("circle.radial-dendrogram-node", { clientX: 447, clientY: 285 }),
};

export const Zoomable = {
    name: "Zoomable with Breadcrumb",
    render: RadialDendrogramTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
        zoomable: true,
        breadcrumb: true,
    },
    play: createSVGTest("circle.radial-dendrogram-node", { clientX: 447, clientY: 285 }),
};
