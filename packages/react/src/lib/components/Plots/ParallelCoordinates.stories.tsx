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

const LARGE_DATASET_GROUPS = ["Fruit", "Vegetable", "Meat", "Fish", "Dairy", "Grain"];

/**
 * A large, deterministically-generated dataset (rather than `Math.random()`) so the story - and any
 * Chromatic snapshot of it - renders identically on every run. Shares nutrients_dataset's fields, so
 * it can drive the same `dimensions`/`color`
 * @param  count       The number of rows to generate
 * @return             The generated rows
 */
function generateLargeDataset(count: number) {
    return Array.from({ length: count }, (_, i) => {
        // A handful of overlapping sine waves per field, rather than pure noise, so brushing a range
        // on one axis visibly correlates with clusters on the others - closer to how a real, batch-
        // rendered dataset tends to look than uniform random noise would
        const group = LARGE_DATASET_GROUPS[i % LARGE_DATASET_GROUPS.length];
        const t = i / count;

        return {
            food: `Item ${i}`,
            group,
            calories: Math.round(150 + 120 * Math.sin(t * 12.1) + 40 * Math.sin(t * 47.3 + i)),
            protein: Math.max(0, Math.round((10 + 9 * Math.sin(t * 8.7 + 1)) * 10) / 10),
            fat: Math.max(0, Math.round((8 + 7 * Math.sin(t * 15.3 + 2)) * 10) / 10),
            carbs: Math.max(0, Math.round((20 + 18 * Math.sin(t * 6.2 + 3)) * 10) / 10),
            fiber: Math.max(0, Math.round((3 + 2.5 * Math.sin(t * 21.4 + 4)) * 10) / 10),
        };
    });
}

const largeDataset = generateLargeDataset(10000);

// A single shared colour with each line mostly transparent, rather than colouring/opacity from the
// default theme - with 10,000 overlapping rows, low per-line opacity is what actually lets areas of
// higher density read as visibly darker, rather than every row (and every dense cluster) looking the
// same solid colour
const largeDatasetTheme = {
    ...themes.light,
    series: {
        ...themes.light.series,
        opacity: 0.05,
    },
};

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

export const CanvasBrushFiltering = {
    name: "Brush Filtering on Canvas",
    render: ParallelCoordinatesTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: async ({ canvasElement }) => {
        // Brushing is identical on Canvas - the <ParallelAxis> ticks/labels/brush are always SVG
        // regardless of `useCanvas` (only the lines themselves move to a <canvas>), so this is the
        // same drag as the `BrushFiltering` story above, just with `useCanvas` set
        const overlay = await waitFor(
            () => {
                const element = canvasElement.querySelector(".parallel-coordinates-axis-brush .overlay") as SVGRectElement | null;
                if (!element) throw new Error("Brush overlay did not render in time");
                return element;
            },
            { timeout: 2000 },
        );

        const rect = overlay.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y0 = rect.top + rect.height * 0.25;
        const y1 = rect.top + rect.height * 0.6;

        fireEvent.mouseDown(overlay, { clientX: x, clientY: y0, bubbles: true, view: window });
        fireEvent.mouseMove(document, { clientX: x, clientY: y1, bubbles: true, view: window });
        fireEvent.mouseUp(document, { clientX: x, clientY: y1, bubbles: true, view: window });

        await wait(300);
    },
};

export const LargeDataset = {
    name: "10,000 Rows on Canvas",
    render: ParallelCoordinatesTemplate,
    parameters: {
        // Excluded rather than snapshotted - 10,000 rows makes for a slow, progressively-rendered
        // Canvas capture (see PROGRESSIVE_RENDER_THRESHOLD) that adds little as a pixel-diff baseline,
        // the same call already made for Scatter's own large-dataset story
        chromatic: { disableSnapshot: true },
    },
    args: {
        ...Basic.args,
        useCanvas: true,
        data: largeDataset,
        theme: largeDatasetTheme,
    },
    play: async ({ canvasElement }) => {
        // Demonstrates that brushing keeps working once the dataset is big enough to fall into
        // progressive/batched Canvas rendering (PROGRESSIVE_RENDER_THRESHOLD, 5,000 rows) - the
        // 10,000 rows here render in batches to keep the browser responsive (see `renderCanvas`),
        // while the brush itself is unaffected since it's still plain SVG
        const overlay = await waitFor(
            () => {
                const element = canvasElement.querySelector(".parallel-coordinates-axis-brush .overlay") as SVGRectElement | null;
                if (!element) throw new Error("Brush overlay did not render in time");
                return element;
            },
            { timeout: 5000 },
        );

        const rect = overlay.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y0 = rect.top + rect.height * 0.35;
        const y1 = rect.top + rect.height * 0.65;

        fireEvent.mouseDown(overlay, { clientX: x, clientY: y0, bubbles: true, view: window });
        fireEvent.mouseMove(document, { clientX: x, clientY: y1, bubbles: true, view: window });
        fireEvent.mouseUp(document, { clientX: x, clientY: y1, bubbles: true, view: window });

        await wait(1000);
    },
};

export const ContextMenu = {
    name: "With a Context Menu",
    render: ParallelCoordinatesTemplate,
    args: {
        ...Basic.args,
    },
    play: async ({ canvasElement }) => {
        // Right-clicking the chart's background - not a line or an axis - opens a radial context
        // menu with a "Reset filters" action (disabled here, since nothing is brushed)
        const svg = canvasElement.querySelector("svg");
        fireEvent.contextMenu(svg, { clientX: 350, clientY: 250, bubbles: true });

        await wait(300);
    },
};
