import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";

import { IParallelCoordinatesPlotProps, ParallelCoordinatesPlot } from "./ParallelCoordinatesPlot";

export interface IParallelCoordinatesProps
    extends Omit<IChartProps, "children">,
        Omit<IParallelCoordinatesPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {}

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
            ticks,
            tickFormat,
            lineWidth,
            brushable,
            onBrush,
            interactive,
            showInLegend,
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
                    ticks={ticks}
                    tickFormat={tickFormat}
                    lineWidth={lineWidth}
                    brushable={brushable}
                    onBrush={onBrush}
                    interactive={interactive}
                    showInLegend={showInLegend}
                />
                <TooltipOverlay onlyNearest={true} />
                <LegendOverlay />
            </Chart>
        );
    },
);

ParallelCoordinates.displayName = "ParallelCoordinates";
