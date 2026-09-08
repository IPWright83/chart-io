import React, { forwardRef } from "react";

import { IChartRef } from "../../Chart";
import { IXYChartProps, XYChart } from "../../XYChart";

import { HeatmapAxes } from "./HeatmapAxes";
import { HeatmapPlot, IHeatmapPlotProps } from "./HeatmapPlot";

export interface IHeatmapProps
    extends Omit<IXYChartProps, "children">,
        Omit<IHeatmapPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {
    /**
     * Lets the user switch between the full grid, a row-stacked-bar-chart and a
     * column-stacked-bar-chart via the "Pivot" action - reachable either by left-clicking any cell
     * (opening its own datum `<ContextMenu>`) or by right-clicking the chart background, since
     * `<XYChart>` already wires both up to the store (see `<ContextMenuOverlay>`)
     * @default false
     */
    pivotable?: boolean;
}

/**
 * Represents a Heatmap chart, a grid of cells - one per `rows`/`columns` combination in the data -
 * colored by `value`. A self-contained chart: no need to wrap it in `<XYChart>` (or add `<XAxis>`/
 * `<YAxis>`) yourself - `<Heatmap>` sets those up internally.
 *
 * Docks its `<Legend>` (the color gradient in the grid layout - see `useColorLegend`) at `"SE"` by
 * default rather than `<XYChart>`'s usual `"E"` - pass `legendPosition` to override.
 *
 * Set `pivotable` to let the user switch between the full grid, a row-stacked-bar-chart (each row's
 * values summed into a single bar along a linear x-axis) and a column-stacked-bar-chart (the same,
 * summed down each column along a linear y-axis) - selecting "Pivot" from either a cell's own
 * left-click menu or the chart's right-click background menu cycles through the three, since
 * `<XYChart>` already wires both up to the store. See the Heatmap docs for more
 * @param  props       The set of React properties
 * @return             The Heatmap component
 */
export const Heatmap = forwardRef<IChartRef, IHeatmapProps>(
    ({ rows, columns, value, colors, cornerRadius, pivotable, interactive, legendPosition = "SE", ...chartProps }, ref) => {
        return (
            <XYChart ref={ref} legendPosition={legendPosition} {...chartProps}>
                <HeatmapAxes rows={rows} columns={columns} value={value} pivotable={pivotable} />
                <HeatmapPlot rows={rows} columns={columns} value={value} colors={colors} cornerRadius={cornerRadius} interactive={interactive} />
            </XYChart>
        );
    },
);

Heatmap.displayName = "Heatmap";
