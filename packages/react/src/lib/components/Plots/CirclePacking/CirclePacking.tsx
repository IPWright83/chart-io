import React from "react";

import { withCanvas, withRectangularPlot, withSVG } from "../../../hoc";

import { CirclePackingBase, ICirclePackingBaseProps } from "./CirclePackingBase";

export interface ICirclePackingProps
    extends Omit<ICirclePackingBaseProps, "layer" | "canvas" | "plotLeft" | "plotTop" | "plotWidth" | "plotHeight"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasCirclePacking = withCanvas(withRectangularPlot<ICirclePackingProps>(CirclePackingBase), "plot circle-packing");
const SVGCirclePacking = withSVG(withRectangularPlot<ICirclePackingProps>(CirclePackingBase), "plot circle-packing");

/**
 * Represents a CirclePacking plot, nesting a circle per node of the hierarchy built from the fields
 * listed in `categories` inside its parent's circle, each sized proportionally to `value`
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The CirclePacking plot component
 */
export function CirclePacking({ useCanvas = false, ...props }: ICirclePackingProps) {
    if (useCanvas) {
        return <CanvasCirclePacking {...props} />;
    }

    return <SVGCirclePacking {...props} />;
}

CirclePacking.requiresVirtualCanvas = true;
CirclePacking.isPlot = true;
