import React from "react";

import { withCanvas, withRadialPlot, withSVG } from "../../../hoc";

import { IRadialDendrogramBaseProps, RadialDendrogramBase } from "./RadialDendrogramBase";

export interface IRadialDendrogramPlotProps
    extends Omit<IRadialDendrogramBaseProps, "layer" | "canvas" | "cx" | "cy" | "maxRadius"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasRadialDendrogramPlot = withCanvas(
    withRadialPlot<IRadialDendrogramPlotProps>(RadialDendrogramBase),
    "plot radial-dendrogram",
);
const SVGRadialDendrogramPlot = withSVG(
    withRadialPlot<IRadialDendrogramPlotProps>(RadialDendrogramBase),
    "plot radial-dendrogram",
);

/**
 * Represents a RadialDendrogram plot, the polar equivalent of `<Dendrogram>` - a tree of nodes built
 * from the fields listed in `categories`, radiating outward from the center with every leaf aligned at
 * the same radius. Used internally by `<Dendrogram radial>` - use that unless you need to compose the
 * plot into a chart of your own
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The RadialDendrogramPlot component
 */
export function RadialDendrogramPlot({ useCanvas = false, ...props }: IRadialDendrogramPlotProps) {
    if (useCanvas) {
        return <CanvasRadialDendrogramPlot {...props} />;
    }

    return <SVGRadialDendrogramPlot {...props} />;
}

RadialDendrogramPlot.requiresVirtualCanvas = true;
RadialDendrogramPlot.isPlot = true;
