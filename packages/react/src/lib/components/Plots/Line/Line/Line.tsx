import type { IPlotProps } from "@chart-io/types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { CanvasLine } from "./CanvasLine";
import { SVGLine } from "./SVGLine";

export interface ILineProps extends Omit<IPlotProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const WrappedCanvasLine = withCanvas(withXYPlot<ILineProps>(CanvasLine), "plot line");
const WrappedSVGLine = withSVG(withXYPlot<ILineProps>(SVGLine), "plot line");

/**
 * Represents a Line plot
 * @param  props       The set of React properties
 * @return             The Line plot component
 */
export function Line({ useCanvas = false, ...props }: ILineProps) {
    if (useCanvas) {
        return <WrappedCanvasLine {...props} />;
    }

    return <WrappedSVGLine {...props} />;
}

Line.requiresVirtualCanvas = false;
Line.isPlot = true;
Line.brush = {
    horizontal: true,
    vertical: false,
};
Line.zoom = {
    horizontal: true,
    vertical: false,
};
