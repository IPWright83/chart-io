import React from "react";

import { withCanvas, withPolarPlot, withSVG } from "../../../../hoc";

import { DonutBase, IDonutBaseProps } from "./DonutBase";

export interface IDonutProps extends Omit<IDonutBaseProps, "layer" | "canvas" | "cx" | "cy" | "maxRadius"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasDonut = withCanvas(withPolarPlot<IDonutProps>(DonutBase), "plot donut");
const SVGDonut = withSVG(withPolarPlot<IDonutProps>(DonutBase), "plot donut");

/**
 * Represents a Donut plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Donut plot component
 */
export function Donut({ useCanvas = false, ...props }: IDonutProps) {
    if (useCanvas) {
        return <CanvasDonut {...props} />;
    }

    return <SVGDonut {...props} />;
}

Donut.requiresVirtualCanvas = true;
Donut.isPlot = true;
