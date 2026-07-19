import React from "react";

import { withCanvas, withRadialPlot, withSVG } from "../../../../hoc";

import { IStackedDonutBaseProps, StackedDonutBase } from "./StackedDonutBase";

export interface IStackedDonutProps
    extends Omit<IStackedDonutBaseProps, "layer" | "canvas" | "cx" | "cy" | "maxRadius"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasStackedDonut = withCanvas(withRadialPlot<IStackedDonutProps>(StackedDonutBase), "plot stacked-donut");
const SVGStackedDonut = withSVG(withRadialPlot<IStackedDonutProps>(StackedDonutBase), "plot stacked-donut");

/**
 * Represents a StackedDonut plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The StackedDonut plot component
 */
export function StackedDonut({ useCanvas = false, ...props }: IStackedDonutProps) {
    if (useCanvas) {
        return <CanvasStackedDonut {...props} />;
    }

    return <SVGStackedDonut {...props} />;
}

StackedDonut.requiresVirtualCanvas = true;
StackedDonut.isPlot = true;
