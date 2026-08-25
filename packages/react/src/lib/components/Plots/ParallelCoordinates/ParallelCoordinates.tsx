import { createResetFiltersAction, createToggleLegendAction } from "@chart-io/core";
import type { IContextMenuItem, IState } from "@chart-io/core";

import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { ContextMenuOverlay } from "../../ContextMenu";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";
import { ParallelAxis } from "../../Axis/ParallelAxis";

import { IParallelCoordinatesPlotProps, ParallelCoordinatesPlot } from "./ParallelCoordinatesPlot";

export interface IParallelCoordinatesProps
    extends Omit<IChartProps, "children">,
        Omit<IParallelCoordinatesPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {
    /**
     * The number of ticks to aim for on each axis
     * @default 5
     */
    ticks?: number;
    /**
     * Should each axis support brush filtering - dragging a range on an axis to fade out every row
     * that doesn't pass through it?
     * @default true
     */
    brushable?: boolean;
    /**
     * Should hovering a row show a tooltip? Off by default - with potentially hundreds of densely
     * packed, crossing lines, a tooltip that follows every hover can be more noise than signal; turn
     * it on for smaller datasets where it's useful
     * @default false
     */
    tooltip?: boolean;
    /**
     * Shows a pluggable radial `<ContextMenu>` (see `<ContextMenuOverlay>`) with "Reset filters" and
     * "Hide/Show legend" actions when right-clicking the chart's background. Set to `false` to turn
     * it off, e.g. if you're wiring up your own via `<ContextMenuOverlay getItems={...}>`
     * @default true
     */
    contextMenu?: boolean;
}

/**
 * The set of actions shown when right-clicking a `<ParallelCoordinates>`'s background - "Reset
 * filters" (clearing every axis' brush selection) and "Hide"/"Show legend". Unlike
 * `getDefaultBackgroundItems`, this omits "Reset zoom"/"Pivot"/"Draw polygon", none of which apply to
 * this chart
 * @param  state       The current Redux state
 * @return             The `<ParallelCoordinates>` background `<ContextMenu>` items
 */
function getContextMenuItems(state: IState): IContextMenuItem[] {
    return [createResetFiltersAction(state), createToggleLegendAction(state)];
}

/**
 * Represents a ParallelCoordinates chart: one line per row of `data`, connecting a point for each
 * field in `dimensions` across a set of vertical axes, one per dimension, supporting any number of
 * dimensions. Each axis can be dragged to brush-filter the rows that pass through it, fading out
 * every row that doesn't. A self-contained chart: no need to wrap it in another chart component
 * yourself
 * @param  props       The set of React properties
 * @return             The ParallelCoordinates component
 */
export const ParallelCoordinates = forwardRef<IChartRef, IParallelCoordinatesProps>(
    (
        {
            dimensions,
            name,
            color,
            ticks = 5,
            tickFormat,
            lineWidth,
            brushable = true,
            interactive,
            showInLegend,
            tooltip = false,
            contextMenu = true,
            ...chartProps
        },
        ref,
    ) => {
        return (
            <Chart ref={ref} {...chartProps}>
                <ParallelCoordinatesPlot
                    dimensions={dimensions}
                    name={name}
                    color={color}
                    tickFormat={tickFormat}
                    lineWidth={lineWidth}
                    interactive={interactive}
                    showInLegend={showInLegend}
                />
                {dimensions.map((dimension) => (
                    <ParallelAxis
                        key={dimension}
                        dimension={dimension}
                        dimensions={dimensions}
                        ticks={ticks}
                        tickFormat={tickFormat}
                        brushable={brushable}
                    />
                ))}
                {tooltip ? <TooltipOverlay onlyNearest={true} /> : null}
                <LegendOverlay />
                {contextMenu && <ContextMenuOverlay getItems={getContextMenuItems} />}
            </Chart>
        );
    },
);

ParallelCoordinates.displayName = "ParallelCoordinates";
