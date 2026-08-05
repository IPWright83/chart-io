import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { argTypes } from "../../../../storybook/argTypes";
import { createEventReceiverTest } from "../../../testUtils";
import { AngleAxis, RadialAxis } from "../../Axis";
import { RadialChart } from "../../RadialChart";
import { RadialArea } from "./RadialArea/RadialArea";
import { RadialAreas } from "./RadialAreas";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "RadialCharts/RadialArea",
    component: RadialArea,
    parameters: {
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
} as Meta<typeof RadialArea>;

// A year of daily temperatures, wrapped around a full circle by day of year
function buildYearOfTemperatures(seed: number, amplitude: number, mean: number) {
    return Array.from({ length: 365 }, (_, day) => {
        const date = new Date(2024, 0, day + 1);
        const seasonal = mean - amplitude * Math.cos((2 * Math.PI * day) / 365);
        // Slow-moving "weather" wobble on top of the seasonal curve - periods of ~40/17 days so it
        // stays smooth from one day to the next, rather than aliasing into a jagged sawtooth
        const wobble = Math.sin(day * 0.15 + seed) * 2 + Math.sin(day * 0.37 + seed) * 1;
        return { date, temperature: Math.max(0, Math.round((seasonal + wobble) * 10) / 10) };
    });
}

const singleCity = buildYearOfTemperatures(0, 12, 15);

const twoCities = buildYearOfTemperatures(0, 12, 15).map((d, i) => ({
    date: d.date,
    "New York": d.temperature,
    // A milder, less seasonally-varied climate for comparison
    Miami: Math.max(0, Math.round((24 - 6 * Math.cos((2 * Math.PI * i) / 365) + Math.sin(i * 0.15) * 1.5) * 10) / 10),
}));

const RadialAreaTemplate = (args) => (
    <RadialChart
        data={args.data}
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
        <AngleAxis fields="date" scaleType="time" ticks={12} tickFormat={(d) => (d as Date).toLocaleString("en-US", { month: "short" })} />
        <RadialAxis fields="temperature" tickFormat={(v) => `${v}°`} />
        <RadialArea x="date" y="temperature" closed={true} />
    </RadialChart>
);

// Passing an explicit domain to <RadialAxis> puts both series on the same scale, so their absolute
// temperatures stay comparable - see the "Multiple Series" section of the docs
const MultiSeriesTemplate = (args) => (
    <RadialChart
        data={twoCities}
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
        <AngleAxis fields="date" scaleType="time" ticks={12} tickFormat={(d) => (d as Date).toLocaleString("en-US", { month: "short" })} />
        <RadialAxis fields={["New York", "Miami"]} domain={[0, 35]} />
        <RadialAreas x="date" ys={["New York", "Miami"]} closed={true} />
    </RadialChart>
);

export const Basic = {
    name: "Basic Plot",
    render: RadialAreaTemplate,
    args: {
        useCanvas: false,
        width: 800,
        height: 500,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 60,
        rightMargin: 60,
        topMargin: 60,
        bottomMargin: 60,
        data: singleCity,
    },
    play: createEventReceiverTest({ clientX: 400, clientY: 60 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: RadialAreaTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createEventReceiverTest({ clientX: 400, clientY: 60 }),
};

export const MultipleSeries = {
    name: "Multiple Series",
    render: MultiSeriesTemplate,
    args: {
        ...Basic.args,
        data: twoCities,
    },
    play: createEventReceiverTest({ clientX: 400, clientY: 60 }),
};
