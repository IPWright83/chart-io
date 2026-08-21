import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { trade_flows_dataset } from "../../../data/trade_flows_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { createSVGTest } from "../../testUtils";
import { Chord } from "./Chord";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/Relational/Chord",
    component: Chord,
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
} as Meta<typeof Chord>;

const data = trade_flows_dataset;

const ChordTemplate = (args) => (
    <Chord
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
        source={args.source}
        target={args.target}
        value={args.value}
        sort={args.sort}
    />
);

export const Basic = {
    name: "Basic Plot",
    render: ChordTemplate,
    args: {
        useCanvas: false,
        width: 600,
        height: 600,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 40,
        rightMargin: 40,
        topMargin: 40,
        bottomMargin: 40,
        source: "from",
        target: "to",
        value: "trade",
        sort: false,
    },
    play: createSVGTest("path.chord-group", { clientX: 300, clientY: 40 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: ChordTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
};

export const Sorted = {
    name: "Sorted by Total Flow",
    render: ChordTemplate,
    args: {
        ...Basic.args,
        sort: true,
    },
    play: createSVGTest("path.chord-group", { clientX: 300, clientY: 40 }),
};
