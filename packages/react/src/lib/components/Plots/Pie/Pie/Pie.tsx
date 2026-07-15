import React from "react";

import { withCanvas, withPolarPlot, withSVG } from "../../../../hoc";

import { IPieBaseProps, PieBase } from "./PieBase";

export interface IPieProps extends Omit<IPieBaseProps, "layer" | "canvas" | "cx" | "cy" | "maxRadius"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasPie = withCanvas(withPolarPlot<IPieProps>(PieBase), "plot pie");
const SVGPie = withSVG(withPolarPlot<IPieProps>(PieBase), "plot pie");

/**
 * Represents a Pie plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Pie plot component
 */
export function Pie({ useCanvas = false, ...props }: IPieProps) {
    if (useCanvas) {
        return <CanvasPie {...props} />;
    }

    return <SVGPie {...props} />;
}

Pie.requiresVirtualCanvas = true;
Pie.isPlot = true;
