import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { expect, fireEvent, fn } from "@storybook/test";
import React from "react";

import { gdp_dataset } from "../../../data/gdp_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { createCanvasTest, createSVGTest, wait } from "../../testUtils";

import { Heatmap } from "./Heatmap";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/Miscellaneous/Heatmap",
    component: Heatmap,
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
} as Meta<typeof Heatmap>;

// One row per continent/country/sector combination - a country's GDP broken down by sector. Reused
// from `<Treemap>`/`<Dendrogram>`
const data = gdp_dataset;

const HeatmapTemplate = (args) => (
    <Heatmap
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
        rows={args.rows}
        columns={args.columns}
        value={args.value}
        colors={args.colors}
        cornerRadius={args.cornerRadius}
        pivotable={args.pivotable}
    />
);

export const Basic = {
    name: "Basic Plot",
    render: HeatmapTemplate,
    args: {
        useCanvas: false,
        width: 800,
        height: 600,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 130,
        rightMargin: 30,
        topMargin: 20,
        bottomMargin: 80,
        rows: "country",
        columns: "sector",
        value: "gdp",
        cornerRadius: 2,
    },
    play: createSVGTest("rect.heatmap-cell", { clientX: 400, clientY: 300 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: HeatmapTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 400, clientY: 300 }),
};

// The "Pivot" action lives on the chart's right-click <ContextMenu> (portaled to document.body)
// rather than an on-chart control - right-click to open it, then select "Pivot" to cycle to the
// next layout (grid -> rows -> columns -> grid). Opening it renders imperatively via D3 inside a
// useEffect, so the item can take an extra tick to appear - poll briefly rather than assuming it's
// there the instant the opening event returns
async function findPivotItem(): Promise<Element> {
    for (let attempt = 0; attempt < 10; attempt++) {
        const items = document.body.querySelectorAll(".context-menu-item");
        const pivotItem = Array.from(items).find((item) => item.textContent.trim().startsWith("Pivot"));
        if (pivotItem) return pivotItem;
        await wait(50);
    }

    throw new Error("The 'Pivot' context-menu item never appeared");
}

async function cyclePivot(canvasElement: HTMLElement, clientX = 400, clientY = 300): Promise<void> {
    const svg = canvasElement.querySelector("svg");
    fireEvent.contextMenu(svg, { bubbles: true, clientX, clientY });
    const pivotItem = await findPivotItem();
    fireEvent.click(pivotItem.querySelector("path"));
}

export const Pivotable = {
    name: "Pivotable (Grid / Rows / Columns)",
    render: HeatmapTemplate,
    args: {
        ...Basic.args,
        pivotable: true,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        await wait(800);

        const widthsFor = () => Array.from(canvasElement.querySelectorAll("rect.heatmap-cell")).map((cell) => cell.getAttribute("width"));

        // In the grid every cell shares its column's fixed band width
        expect(new Set(widthsFor()).size).toBe(1);

        // Pivoting to rows collapses the sector (column) axis into a linear scale - each country's
        // cells now stack edge-to-edge, sized by their own share of that country's total GDP
        await cyclePivot(canvasElement);
        await wait(800);
        expect(new Set(widthsFor()).size).toBeGreaterThan(1);
        expect(canvasElement.querySelector(".color-legend")).toBeNull();

        // Pivoting to columns instead collapses the country (row) axis - each sector's cells stack
        // vertically by height instead
        await cyclePivot(canvasElement);
        await wait(800);
        const heightsFor = Array.from(canvasElement.querySelectorAll("rect.heatmap-cell")).map((cell) => cell.getAttribute("height"));
        expect(new Set(heightsFor).size).toBeGreaterThan(1);

        // Back to the grid, and the legend returns
        await cyclePivot(canvasElement);
        await wait(800);
        expect(new Set(widthsFor()).size).toBe(1);
        expect(canvasElement.querySelector(".color-legend")).not.toBeNull();
    },
};

// Shows the "Rows" layout at rest (rather than mid-cycle, as in the Pivotable story above) - each
// country's cells stacked edge-to-edge into a single horizontal bar, sized by that country's share
// of its own total GDP, with the column (sector) axis collapsed into a shared linear scale
export const PivotedToRows = {
    name: "Pivoted to Rows",
    render: HeatmapTemplate,
    args: {
        ...Basic.args,
        pivotable: true,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        await wait(800);
        await cyclePivot(canvasElement);
        await wait(800);

        const widths = Array.from(canvasElement.querySelectorAll("rect.heatmap-cell")).map((cell) => cell.getAttribute("width"));
        expect(new Set(widths).size).toBeGreaterThan(1);
    },
};

// The "Columns" layout at rest - the row (country) axis collapses instead, so each sector's cells
// stack into a single vertical bar sized by that sector's share of its own total across countries
export const PivotedToColumns = {
    name: "Pivoted to Columns",
    render: HeatmapTemplate,
    args: {
        ...Basic.args,
        pivotable: true,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        await wait(800);
        await cyclePivot(canvasElement);
        await cyclePivot(canvasElement);
        await wait(800);

        const heights = Array.from(canvasElement.querySelectorAll("rect.heatmap-cell")).map((cell) => cell.getAttribute("height"));
        expect(new Set(heights).size).toBeGreaterThan(1);
    },
};

// A larger, denser dataset (a full week of hourly readings) than the 4-cell Basic example, to show
// pivoting at scale. Deterministic (not random, so it's stable for visual regression) - a bell curve
// peaking mid-afternoon, lower on weekends, with a little day-to-day variation. `pivotable` cycles
// Grid -> Rows (each weekday's hourly cells stacked into one bar) -> Columns (each hour's cells
// stacked across the whole week instead)
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

function levelFor(dayIndex: number, hour: number): number {
    const peak = 14;
    const spread = 5;
    const base = 20 * Math.exp(-((hour - peak) ** 2) / (2 * spread * spread));
    const weekendFactor = dayIndex >= 5 ? 0.4 : 1;
    const dailyVariation = Math.sin(dayIndex * 3 + hour) * 2;
    return Math.max(0, Math.round(base * weekendFactor + dailyVariation));
}

const weeklyPatternData = DAYS.flatMap((day, dayIndex) =>
    HOURS.map((hour) => ({
        day,
        hour: `${String(hour).padStart(2, "0")}:00`,
        level: levelFor(dayIndex, hour),
    })),
);

export const WeeklyPattern = {
    name: "Weekly Pattern (Day / Hour)",
    render: HeatmapTemplate,
    args: {
        ...Basic.args,
        data: weeklyPatternData,
        rows: "day",
        columns: "hour",
        value: "level",
        colors: ["#f7fbff", "#08306b"],
        leftMargin: 60,
        pivotable: true,
    },
    play: createSVGTest("rect.heatmap-cell", { clientX: 400, clientY: 300 }),
};

// A correlation matrix - the classic diverging use case. Its palette has an odd number of stops (3),
// so `<Heatmap>` centers the color scale on 0 rather than the data's own midpoint: two variables with
// no correlation get the middle (white) color regardless of what else is in the matrix, and positive/
// negative correlations of the same magnitude get equally saturated colors
const VARIABLES = ["Price", "Volume", "Volatility", "Sentiment", "Momentum", "Liquidity"];

// prettier-ignore
const CORRELATIONS = [
    [ 1.00,  0.42, -0.35,  0.61,  0.58, -0.12],
    [ 0.42,  1.00,  0.55, -0.20,  0.30,  0.66],
    [-0.35,  0.55,  1.00, -0.48, -0.30,  0.25],
    [ 0.61, -0.20, -0.48,  1.00,  0.72, -0.15],
    [ 0.58,  0.30, -0.30,  0.72,  1.00,  0.10],
    [-0.12,  0.66,  0.25, -0.15,  0.10,  1.00],
];

const correlationData = VARIABLES.flatMap((rowVariable, i) =>
    VARIABLES.map((columnVariable, j) => ({
        rowVariable,
        columnVariable,
        correlation: CORRELATIONS[i][j],
    })),
);

export const CorrelationMatrix = {
    name: "Correlation Matrix (diverging colors)",
    render: HeatmapTemplate,
    args: {
        ...Basic.args,
        data: correlationData,
        rows: "rowVariable",
        columns: "columnVariable",
        value: "correlation",
        colors: ["#b2182b", "#f7f7f7", "#2166ac"],
        leftMargin: 90,
        pivotable: false,
    },
    play: createSVGTest("rect.heatmap-cell", { clientX: 400, clientY: 300 }),
};
