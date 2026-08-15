import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../../data/gdp_dataset";
import { argTypes } from "../../../../storybook/argTypes";
import { jitterFields, withDataControls } from "../../../../storybook/dataControls";
import { createCanvasTest, createSVGTest } from "../../../testUtils";
import { RadialChart } from "../../RadialChart";
import { Donut } from "./Donut";
import { Pie } from "./Pie";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/RadialCharts/Pie",
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

// Aggregate GDP by continent, since a Pie/Donut expects a single row per category
const data = Array.from(
    gdp_dataset
        .reduce((byContinent, d) => byContinent.set(d.continent, (byContinent.get(d.continent) ?? 0) + d.gdp), new Map()),
    ([continent, gdp]) => ({ continent, gdp }),
);

// Continent GDP is fully aggregated already, so there's nothing left to randomize but the value.
const pieDataControls = {
    initialData: data,
    randomize: (row: (typeof data)[number]) => jitterFields(row, ["gdp"], 0.3),
    // Every continent in the source dataset is already represented - clone a random slice under a
    // synthetic label instead, so the chart still gains a visibly new slice
    createPoint: (current: typeof data) => {
        const base = current[Math.floor(Math.random() * current.length)];
        return jitterFields({ ...base, continent: `${base.continent} (New)` }, ["gdp"], 0.3);
    },
    minLength: 2,
};

const PieTemplate = (args) => (
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
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <Pie category={args.category} value={args.value} sort={args.sort} />
    </RadialChart>
);

const PieTemplateWithControls = withDataControls(PieTemplate, pieDataControls);

const DonutTemplate = (args) => (
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
        <Donut category={args.category} value={args.value} />
    </RadialChart>
);

export const Basic = {
    name: "Basic Plot",
    render: PieTemplateWithControls,
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
        category: "continent",
        value: "gdp",
    },
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: PieTemplateWithControls,
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
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};

export const TraditionalTooltip = {
    name: "Traditional Tooltip",
    render: DonutTemplate,
    args: {
        ...Basic.args,
        centerValue: false,
    },
    play: createSVGTest("path.pie-slice", { clientX: 300, clientY: 250 }),
};
