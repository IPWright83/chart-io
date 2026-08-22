import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
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
            colors,
            ticks = 5,
            tickFormat,
            lineWidth,
            brushable = true,
            onBrush,
            interactive,
            showInLegend,
            tooltip = false,
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
                    colors={colors}
                    tickFormat={tickFormat}
                    lineWidth={lineWidth}
                    onBrush={onBrush}
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
            </Chart>
        );
    },
);

ParallelCoordinates.displayName = "ParallelCoordinates";
