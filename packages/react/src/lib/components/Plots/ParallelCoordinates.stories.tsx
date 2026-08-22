import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fireEvent, fn, waitFor } from "@storybook/test";
import React from "react";

import { nutrients_dataset } from "../../../data/nutrients_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { wait } from "../../testUtils";
import { ParallelCoordinates } from "./ParallelCoordinates";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/Multivariate/ParallelCoordinates",
    component: ParallelCoordinates,
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
} as Meta<typeof ParallelCoordinates>;

const data = nutrients_dataset;
const dimensions = ["calories", "protein", "fat", "carbs", "fiber"];

const ParallelCoordinatesTemplate = (args) => (
    <ParallelCoordinates
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
        dimensions={args.dimensions}
        name={args.name}
        color={args.color}
        showInLegend={args.showInLegend}
        brushable={args.brushable}
    />
);

export const Basic = {
    name: "Basic Plot",
    render: ParallelCoordinatesTemplate,
    args: {
        useCanvas: false,
        width: 700,
        height: 500,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 40,
        rightMargin: 40,
        topMargin: 40,
        bottomMargin: 40,
        dimensions,
        name: "food",
    },
};

export const Canvas = {
    name: "Using Canvas",
    render: ParallelCoordinatesTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
};

export const ColoredByCategory = {
    name: "Colored by Category",
    render: ParallelCoordinatesTemplate,
    args: {
        ...Basic.args,
        color: "group",
        showInLegend: true,
    },
};

export const WithoutBrushing = {
    name: "Without Brushing",
    render: ParallelCoordinatesTemplate,
    args: {
        ...Basic.args,
        brushable: false,
    },
};

export const BrushFiltering = {
    name: "With a Brush Filter Applied",
    render: ParallelCoordinatesTemplate,
    args: {
        ...Basic.args,
    },
    play: async ({ canvasElement }) => {
        // Poll for the first axis' brush overlay rather than assuming a fixed render delay - waitFor
        // also surfaces a clear "never rendered" error instead of a null-dereference if it doesn't
        // appear in time
        const overlay = await waitFor(
            () => {
                const element = canvasElement.querySelector(".parallel-coordinates-axis-brush .overlay") as SVGRectElement | null;
                if (!element) throw new Error("Brush overlay did not render in time");
                return element;
            },
            { timeout: 2000 },
        );

        // Drag a selection on the first axis' brush - reading its real on-screen position rather than
        // assuming fixed coordinates, so this doesn't depend on exactly how/where Storybook lays out
        // the canvas
        const rect = overlay.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y0 = rect.top + rect.height * 0.25;
        const y1 = rect.top + rect.height * 0.6;

        // d3-drag reads the mousedown event's `view` to know which window to attach the rest of the
        // drag's move/up listeners to - fireEvent's MouseEvent defaults that to null, which makes the
        // brush silently ignore the drag, so it must be passed explicitly here
        fireEvent.mouseDown(overlay, { clientX: x, clientY: y0, bubbles: true, view: window });
        fireEvent.mouseMove(document, { clientX: x, clientY: y1, bubbles: true, view: window });
        fireEvent.mouseUp(document, { clientX: x, clientY: y1, bubbles: true, view: window });

        await wait(300);
    },
};
