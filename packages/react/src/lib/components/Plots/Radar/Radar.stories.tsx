import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { argTypes } from "../../../../storybook/argTypes";
import { createCanvasTest, createSVGTest } from "../../../testUtils";
import { AngleAxis, RadiusAxis } from "../../Axis";
import { RadialChart } from "../../RadialChart";
import { Radar } from "./Radar";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "RadialCharts/Radar",
    component: Radar,
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
} as Meta<typeof Radar>;

const data = [
    { skill: "Speed", playerA: 80, playerB: 60 },
    { skill: "Power", playerA: 65, playerB: 90 },
    { skill: "Defense", playerA: 70, playerB: 75 },
    { skill: "Stamina", playerA: 85, playerB: 55 },
    { skill: "Agility", playerA: 60, playerB: 80 },
];

const RadarTemplate = (args) => (
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
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        <AngleAxis fields={[args.category]} />
        <RadiusAxis fields={args.ys} />
        <Radar category={args.category} ys={args.ys} />
    </RadialChart>
);

export const Basic = {
    name: "Basic Plot",
    render: RadarTemplate,
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
        category: "skill",
        ys: ["playerA", "playerB"],
    },
    play: createSVGTest("circle.radar-marker", { clientX: 300, clientY: 250 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: RadarTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    // Targets the "Speed" vertex marker for playerA, near the top of the chart
    play: createCanvasTest({ clientX: 416, clientY: 97 }),
};

export const SingleSeries = {
    name: "Single Series",
    render: RadarTemplate,
    args: {
        ...Basic.args,
        ys: ["playerA"],
    },
    play: createSVGTest("circle.radar-marker", { clientX: 300, clientY: 250 }),
};
