import React from "react";

import { withCanvas, withRectangularPlot, withSVG } from "../../../hoc";

import { DendrogramBase, IDendrogramBaseProps } from "./DendrogramBase";

export interface IDendrogramProps
    extends Omit<IDendrogramBaseProps, "layer" | "canvas" | "plotLeft" | "plotTop" | "plotWidth" | "plotHeight"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasDendrogram = withCanvas(withRectangularPlot<IDendrogramProps>(DendrogramBase), "plot dendrogram");
const SVGDendrogram = withSVG(withRectangularPlot<IDendrogramProps>(DendrogramBase), "plot dendrogram");

/**
 * Represents a Dendrogram plot, a tree of nodes built from the fields listed in `categories`, laid out
 * left-to-right with every leaf aligned at the same depth
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Dendrogram plot component
 */
export function Dendrogram({ useCanvas = false, ...props }: IDendrogramProps) {
    if (useCanvas) {
        return <CanvasDendrogram {...props} />;
    }

    return <SVGDendrogram {...props} />;
}

Dendrogram.requiresVirtualCanvas = true;
Dendrogram.isPlot = true;
