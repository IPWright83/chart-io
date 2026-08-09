import React from "react";

import { withCanvas, withSVG } from "../../../hoc";

import { CirclePackingBase, ICirclePackingBaseProps } from "./CirclePackingBase";

export interface ICirclePackingPlotProps extends Omit<ICirclePackingBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasCirclePackingPlot = withCanvas(CirclePackingBase, "plot circle-packing");
const SVGCirclePackingPlot = withSVG(CirclePackingBase, "plot circle-packing");

/**
 * Represents a CirclePacking plot, nesting a circle per node of the hierarchy built from the fields
 * listed in `categories` inside its parent's circle, each sized proportionally to `value`. Used
 * internally by `<CirclePacking>` - use that unless you need to compose the plot into a chart of your
 * own
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The CirclePackingPlot component
 */
export function CirclePackingPlot({ useCanvas = false, ...props }: ICirclePackingPlotProps) {
    if (useCanvas) {
        return <CanvasCirclePackingPlot {...props} />;
    }

    return <SVGCirclePackingPlot {...props} />;
}

CirclePackingPlot.requiresVirtualCanvas = true;
CirclePackingPlot.isPlot = true;
