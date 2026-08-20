import React from "react";

import { withCanvas, withSVG } from "../../../../hoc";

import { IParallelCoordinatesLinesPlotBaseProps, ParallelCoordinatesLinesPlotBase } from "./ParallelCoordinatesLinesPlotBase";

export interface IParallelCoordinatesLinesPlotProps extends Omit<IParallelCoordinatesLinesPlotBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const WrappedCanvasLinesPlot = withCanvas<IParallelCoordinatesLinesPlotBaseProps>(
    ParallelCoordinatesLinesPlotBase,
    "plot parallel-coordinates-lines",
);
const WrappedSVGLinesPlot = withSVG<IParallelCoordinatesLinesPlotBaseProps>(
    ParallelCoordinatesLinesPlotBase,
    "plot parallel-coordinates-lines",
);

/**
 * Represents a `<ParallelCoordinates>`'s lines layer, picking a Canvas or SVG layer to render
 * `ParallelCoordinatesLinesPlotBase` onto - the same wrapping convention as `<Line>`/`LineBase`
 * @param  props       The set of React properties
 * @return             The ParallelCoordinatesLinesPlot component
 */
export function ParallelCoordinatesLinesPlot({ useCanvas = false, ...props }: IParallelCoordinatesLinesPlotProps) {
    if (useCanvas) {
        return <WrappedCanvasLinesPlot {...props} />;
    }

    return <WrappedSVGLinesPlot {...props} />;
}
