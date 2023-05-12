import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { IScatterBaseProps, ScatterBase } from "./ScatterBase";

export interface IScatterProps extends Omit<IScatterBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasScatter = withCanvas(withXYPlot<IScatterProps>(ScatterBase), "plot scatter");
const SVGScatter = withSVG(withXYPlot<IScatterProps>(ScatterBase), "plot scatter");

/**
 * Represents a Scatter plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React props
 * @return             The Scatter plot component
 */
export function Scatter({ useCanvas = false, ...props }: IScatterProps) {
    if (useCanvas) {
        return <CanvasScatter {...props} />;
    }

    return <SVGScatter {...props} />;
}

Scatter.requiresVirtualCanvas = true;
Scatter.isPlot = true;
Scatter.brushHorizontal = true;
Scatter.brushVertical = true;
