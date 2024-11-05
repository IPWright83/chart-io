import { themes } from "@chart-io/core";
import * as d3 from "@chart-io/d3";

import { uniqBy } from "lodash";
import React from "react";

import { basicData } from "../../../../data/basic";
import { argTypes } from "../../../../storybook/argTypes";
import { createCanvasTest, createSVGTest } from "../../../testUtils";
import { XAxis, YAxis } from "../../Axis";
import { XYChart } from "../../XYChart";
import { Bar } from "./Bar";
import { Bars } from "./Bars";

const { width, height, useCanvas, theme, color } = argTypes;

export default {
    title: "XYCharts/Bar",
    component: Bar,
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
    argTypes: {
        useCanvas,
        width,
        height,
        theme,
        color,
        onClick: { action: "clicked" },
        onMouseOver: { action: "onMouseOver" },
        onMouseOut: { action: "onMouseOut" },
    },
};

const BarTemplate = (args) => (
    <XYChart
        data={basicData}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
        theme={args.theme}
        useCanvas={args.useCanvas}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <YAxis fields={[args.y]} scaleType="band" showGridlines={false} tickFormat={d3.timeFormat("%B")} />
        <XAxis fields={[args.x, args.x2, args.x3]} />
        <Bar x={args.x} y={args.y} color={args.color} />
        {args.x2 && <Bar x={args.x2} y={args.y} color={args.color2} />}
    </XYChart>
);

const BarsTemplate = (args) => (
    <XYChart
        data={basicData}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
        useCanvas={args.useCanvas}
        theme={args.theme}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <YAxis fields={[args.y]} scaleType="band" showGridlines={false} tickFormat={d3.timeFormat("%B")} />
        <XAxis fields={[args.x, args.x2, args.x3]} aggregate={args.stacked} />
        <Bars y={args.y} xs={[args.x, args.x2]} grouped={args.grouped} stacked={args.stacked} />
    </XYChart>
);

export const Basic = {
    name: "Basic Plot",
    render: BarTemplate,
    args: {
        useCanvas: false,
        width: 800,
        height: 500,
        animationDuration: 250,
        color: "#99C1DC",
        color2: "#fc998e",
        theme: themes.light,
        y: "month",
        x: "sales",
    },
    play: createSVGTest("rect.bar", { clientX: 107, clientY: 396 }),
};

export const Color = {
    name: "Custom Color",
    render: BarTemplate,
    args: {
        ...Basic.args,
        color: "orange",
    },
};

export const Canvas = {
    name: "Using Canvas",
    render: BarTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 245, clientY: 455 }),
};

export const Ratio = {
    name: "Ratio Bars",
    render: BarTemplate,
    args: {
        ...Basic.args,
        x: "target",
        x2: "revenue",
        theme: {
            ...themes.light,
            series: {
                ...themes.light.series,
                opacity: 1,
            },
        },
    },
};

export const Stacked = {
    name: "Stacked Bars",
    render: BarsTemplate,
    args: {
        ...Basic.args,
        x2: "revenue",
        stacked: true,
    },
    play: createSVGTest("rect.bar", { clientX: 107, clientY: 396 }),
};

export const Grouped = {
    name: "Grouped Bars",
    render: BarsTemplate,
    args: {
        ...Basic.args,
        x2: "revenue",
        grouped: true,
    },
    play: createSVGTest("rect.bar", { clientX: 107, clientY: 396 }),
};
