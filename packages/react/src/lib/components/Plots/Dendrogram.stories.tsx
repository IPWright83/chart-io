import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../data/gdp_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { createCanvasTest, createSVGTest } from "../../testUtils";
import { Dendrogram } from "./Dendrogram";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/Hierarchical/Dendrogram",
    component: Dendrogram,
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
} as Meta<typeof Dendrogram>;

const data = gdp_dataset;

const DendrogramTemplate = (args) => (
    <Dendrogram
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
        radial={args.radial}
        zoomable={args.zoomable}
        breadcrumb={args.breadcrumb}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
        categories={args.categories}
        value={args.value}
        sort={args.sort}
        nodeRadius={args.nodeRadius}
    />
);

export const Basic = {
    name: "Basic Plot",
    render: DendrogramTemplate,
    args: {
        useCanvas: false,
        width: 800,
        height: 500,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 40,
        rightMargin: 100,
        topMargin: 40,
        bottomMargin: 40,
        categories: ["continent", "country"],
        value: "gdp",
        sort: true,
        zoomable: false,
        breadcrumb: false,
    },
    play: createSVGTest("circle.dendrogram-node", { clientX: 100, clientY: 250 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: DendrogramTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    // Unlike createSVGTest (which grabs a DOM node directly by selector), this fires a real
    // mousemove/click at these page coordinates and relies on the virtual canvas's pixel-color hit
    // testing - so it has to land exactly on a rendered node. With `categories={["continent",
    // "country"]}` the first-level (continent) nodes sit at local SVG (330, 92.5); +16 accounts for
    // the Storybook root's own padding
    play: createCanvasTest({ clientX: 346, clientY: 108.5 }),
};

export const ThreeLevel = {
    name: "3-level Dendrogram",
    render: DendrogramTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
    },
    play: createSVGTest("circle.dendrogram-node", { clientX: 100, clientY: 250 }),
};

export const SizedByValue = {
    name: "Sized by Value",
    render: DendrogramTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country"],
        nodeRadius: [3, 24],
    },
    play: createSVGTest("circle.dendrogram-node", { clientX: 100, clientY: 250 }),
};

export const Zoomable = {
    name: "Zoomable with Breadcrumb",
    render: DendrogramTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
        zoomable: true,
        breadcrumb: true,
    },
    play: createSVGTest("circle.dendrogram-node", { clientX: 100, clientY: 250 }),
};

export const Radial = {
    name: "Radial",
    render: DendrogramTemplate,
    args: {
        ...Basic.args,
        radial: true,
        width: 700,
        height: 700,
        leftMargin: 60,
        rightMargin: 60,
        topMargin: 60,
        bottomMargin: 60,
    },
    play: createSVGTest("circle.radial-dendrogram-node", { clientX: 447, clientY: 285 }),
};

export const RadialCanvas = {
    name: "Radial, Using Canvas",
    render: DendrogramTemplate,
    args: {
        ...Radial.args,
        useCanvas: true,
    },
};

export const RadialThreeLevel = {
    name: "Radial, 3-level",
    render: DendrogramTemplate,
    args: {
        ...Radial.args,
        categories: ["continent", "country", "sector"],
    },
    play: createSVGTest("circle.radial-dendrogram-node", { clientX: 447, clientY: 285 }),
};

export const RadialZoomable = {
    name: "Radial, Zoomable with Breadcrumb",
    render: DendrogramTemplate,
    args: {
        ...Radial.args,
        categories: ["continent", "country", "sector"],
        zoomable: true,
        breadcrumb: true,
    },
    play: createSVGTest("circle.radial-dendrogram-node", { clientX: 447, clientY: 285 }),
};
