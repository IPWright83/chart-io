import React from "react";

import { withCanvas, withRadialPlot, withSVG } from "../../../hoc";

import { IRadialDendrogramBaseProps, RadialDendrogramBase } from "./RadialDendrogramBase";

export interface IRadialDendrogramProps
    extends Omit<IRadialDendrogramBaseProps, "layer" | "canvas" | "cx" | "cy" | "maxRadius"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasRadialDendrogram = withCanvas(
    withRadialPlot<IRadialDendrogramProps>(RadialDendrogramBase),
    "plot radial-dendrogram",
);
const SVGRadialDendrogram = withSVG(
    withRadialPlot<IRadialDendrogramProps>(RadialDendrogramBase),
    "plot radial-dendrogram",
);

/**
 * Represents a RadialDendrogram plot, the polar equivalent of `<Dendrogram>` - a tree of nodes built
 * from the fields listed in `categories`, radiating outward from the center with every leaf aligned at
 * the same radius
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The RadialDendrogram plot component
 */
export function RadialDendrogram({ useCanvas = false, ...props }: IRadialDendrogramProps) {
    if (useCanvas) {
        return <CanvasRadialDendrogram {...props} />;
    }

    return <SVGRadialDendrogram {...props} />;
}

RadialDendrogram.requiresVirtualCanvas = true;
RadialDendrogram.isPlot = true;
