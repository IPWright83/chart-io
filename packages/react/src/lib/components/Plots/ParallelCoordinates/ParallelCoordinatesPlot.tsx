import React from "react";

import { withCanvas, withSVG } from "../../../hoc";

import { IParallelCoordinatesPlotBaseProps, ParallelCoordinatesPlotBase } from "./ParallelCoordinatesPlotBase";

export interface IParallelCoordinatesPlotProps extends Omit<IParallelCoordinatesPlotBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const WrappedCanvasParallelCoordinatesPlot = withCanvas<IParallelCoordinatesPlotBaseProps>(
    ParallelCoordinatesPlotBase,
    "plot parallel-coordinates-lines",
);
const WrappedSVGParallelCoordinatesPlot = withSVG<IParallelCoordinatesPlotBaseProps>(
    ParallelCoordinatesPlotBase,
    "plot parallel-coordinates-lines",
);

/**
 * Represents a ParallelCoordinates plot: one polyline per row of `data`, connecting a point for each
 * field in `dimensions` across a set of independently-scaled vertical axes evenly spaced across the
 * plot. Used internally by `<ParallelCoordinates>` - use that unless you need to compose the plot into
 * a chart of your own. Picks a Canvas or SVG layer to render `ParallelCoordinatesPlotBase` onto - the
 * same wrapping convention as `<Line>`/`LineBase`
 * @param  props       The set of React properties
 * @return             The ParallelCoordinatesPlot component
 */
export function ParallelCoordinatesPlot({ useCanvas = false, ...props }: IParallelCoordinatesPlotProps) {
    if (useCanvas) {
        return <WrappedCanvasParallelCoordinatesPlot {...props} />;
    }

    return <WrappedSVGParallelCoordinatesPlot {...props} />;
}

ParallelCoordinatesPlot.requiresVirtualCanvas = true;
ParallelCoordinatesPlot.isPlot = true;
