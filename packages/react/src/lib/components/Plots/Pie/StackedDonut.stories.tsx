import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../../data/gdp_dataset";
import { argTypes } from "../../../../storybook/argTypes";
import { jitterFields, withDataControls } from "../../../../storybook/dataControls";
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

// Split each row's GDP across two halves of the year, purely to demonstrate that `categories`
// supports more than the 2-3 levels shown above - any number of fields can be chained together
const fourLevelData = gdp_dataset.flatMap((d) => [
    { ...d, half: "H1", gdp: Math.round(d.gdp * 0.45) },
    { ...d, half: "H2", gdp: Math.round(d.gdp * 0.55) },
]);

const stackedDonutDataControls = {
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

const StackedDonutTemplate = (args) => (
    <RadialChart
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
        centerValue={args.centerValue}
        breadcrumb={args.breadcrumb}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <StackedDonut categories={args.categories} value={args.value} sort={args.sort} zoomable={args.zoomable} />
    </RadialChart>
);

const StackedDonutTemplateWithControls = withDataControls(StackedDonutTemplate, stackedDonutDataControls);

export const Basic = {
    name: "Basic Plot",
    render: StackedDonutTemplateWithControls,
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
    render: StackedDonutTemplateWithControls,
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
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};

export const DeepSunburst = {
    name: "4-level Sunburst",
    render: StackedDonutTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector", "half"],
        data: fourLevelData,
    },
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};

export const TraditionalTooltip = {
    name: "Traditional Tooltip",
    render: StackedDonutTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
        centerValue: false,
    },
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};

export const Zoomable = {
    name: "Zoomable with Breadcrumb",
    render: StackedDonutTemplate,
    args: {
        ...Basic.args,
        categories: ["continent", "country", "sector"],
        zoomable: true,
        breadcrumb: true,
    },
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};
