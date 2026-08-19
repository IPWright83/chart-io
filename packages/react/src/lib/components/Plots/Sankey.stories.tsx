import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../data/gdp_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { jitterFields, withDataControls } from "../../../storybook/dataControls";
import { createCanvasTest, createSVGTest } from "../../testUtils";
import { Sankey } from "./Sankey";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/Flow/Sankey",
    component: Sankey,
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
} as Meta<typeof Sankey>;

const data = gdp_dataset;

const sankeyDataControls = {
    initialData: data,
    randomize: (row: (typeof data)[number]) => jitterFields(row, ["gdp"], 0.3),
    // Clones a random existing row under a synthetic country name, since every continent/country
    // pairing in the source dataset is already represented
    createPoint: (current: typeof data) => {
        const base = current[Math.floor(Math.random() * current.length)];
        return jitterFields({ ...base, country: `${base.country} (New)` }, ["gdp"], 0.3);
    },
    minLength: 6,
};

const SankeyTemplate = (args) => (
    <Sankey
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
        categories={args.categories}
        value={args.value}
    />
);

const SankeyTemplateWithControls = withDataControls(SankeyTemplate, sankeyDataControls);

export const Basic = {
    name: "Basic Plot",
    render: SankeyTemplateWithControls,
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
        categories: ["continent", "sector"],
        value: "gdp",
    },
    play: createSVGTest("rect.sankey-node", { clientX: 150, clientY: 150 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: SankeyTemplateWithControls,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 150, clientY: 150 }),
};

export const ThreeColumn = {
    name: "3-column Sankey",
    render: SankeyTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
    },
    play: createSVGTest("rect.sankey-node", { clientX: 150, clientY: 150 }),
};
