import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { expect, fireEvent, fn } from "@storybook/test";
import React, { useState } from "react";

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

// One row per continent/country/sector combination - a country's GDP broken down by sector. Reusing
// the same dataset as `<Treemap>`/`<Dendrogram>` since its continent/country grouping is exactly what
// `rowGroupBy` needs to demonstrate animated grouping. Sorted alphabetically by country (rather than
// continent-by-continent, as the source data happens to be) so the "ungrouped" layout doesn't already
// happen to match the grouped one - otherwise toggling `rowsGrouped` wouldn't visibly move anything
const data = [...gdp_dataset].sort((a, b) => a.country.localeCompare(b.country));

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
        padding={args.padding}
        cornerRadius={args.cornerRadius}
        rowGroupBy={args.rowGroupBy}
        columnGroupBy={args.columnGroupBy}
        rowsGrouped={args.rowsGrouped}
        columnsGrouped={args.columnsGrouped}
    />
);

export const Basic = {
    name: "Basic Plot",
    render: HeatmapTemplate,
    args: {
        useCanvas: false,
        width: 800,
        height: 550,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 130,
        rightMargin: 30,
        topMargin: 40,
        bottomMargin: 20,
        rows: "country",
        columns: "sector",
        value: "gdp",
        padding: 2,
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

export const GroupedByContinent = {
    name: "Grouped Rows",
    render: HeatmapTemplate,
    args: {
        ...Basic.args,
        rowGroupBy: "continent",
        rowsGrouped: true,
    },
    play: createSVGTest("rect.heatmap-cell", { clientX: 400, clientY: 300 }),
};

// A stateful wrapper (not part of the library) that owns a `rowsGrouped` toggle, so a click on the
// button re-renders `<Heatmap>` with the opposite value. Since every cell is keyed by its row/column
// pair, none of them are re-created - they just transition to their new row position, animating the
// countries sliding into their continent's cluster (and back out again)
const buttonStyle: React.CSSProperties = {
    padding: "6px 12px",
    border: "1px solid #99C1DC",
    borderRadius: 4,
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
    whiteSpace: "nowrap",
};

function AnimatedGroupingTemplate(args) {
    const [rowsGrouped, setRowsGrouped] = useState(false);

    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
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
                padding={args.padding}
                cornerRadius={args.cornerRadius}
                rowGroupBy="continent"
                rowsGrouped={rowsGrouped}
            />
            <button type="button" style={buttonStyle} onClick={() => setRowsGrouped((grouped) => !grouped)}>
                {rowsGrouped ? "Ungroup rows" : "Group rows by continent"}
            </button>
        </div>
    );
}

export const AnimatedGrouping = {
    name: "Animated Grouping",
    render: AnimatedGroupingTemplate,
    args: {
        ...Basic.args,
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        await wait(800);

        const labelFor = (country: string) =>
            Array.from(canvasElement.querySelectorAll("text.heatmap-row-label")).find((label) => label.textContent === country);

        const ungroupedY = labelFor("Canada")?.getAttribute("y");
        expect(ungroupedY).toBeDefined();

        const button = canvasElement.querySelector("button");
        expect(button).toBeDefined();

        fireEvent.click(button);
        await wait(800);

        // Grouping by continent moves "Canada" (originally 2nd of 15 countries) next to the other
        // North American countries at the top of the grid - its row band, and so its label's y,
        // ends up somewhere else entirely
        const groupedY = labelFor("Canada")?.getAttribute("y");
        expect(groupedY).toBeDefined();
        expect(groupedY).not.toBe(ungroupedY);
    },
};
