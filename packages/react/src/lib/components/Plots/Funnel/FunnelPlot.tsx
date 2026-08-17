import React from "react";

import { withCanvas, withSVG } from "../../../hoc";

import { FunnelBase, IFunnelBaseProps } from "./FunnelBase";

export interface IFunnelPlotProps extends Omit<IFunnelBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasFunnelPlot = withCanvas(FunnelBase, "plot funnel");
const SVGFunnelPlot = withSVG(FunnelBase, "plot funnel");

/**
 * Represents a Funnel plot, stacking one trapezoid segment per row of data built from `category`,
 * each sized proportionally to `value`. Used internally by `<Funnel>`/`<Pyramid>` - use that unless
 * you need to compose the plot into a chart of your own
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The FunnelPlot component
 */
export function FunnelPlot({ useCanvas = false, ...props }: IFunnelPlotProps) {
    if (useCanvas) {
        return <CanvasFunnelPlot {...props} />;
    }

    return <SVGFunnelPlot {...props} />;
}

FunnelPlot.requiresVirtualCanvas = true;
FunnelPlot.isPlot = true;
