import React from "react";

import { withCanvas, withSVG } from "../../../hoc";

import { DendrogramBase, IDendrogramBaseProps } from "./DendrogramBase";

export interface IDendrogramPlotProps extends Omit<IDendrogramBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasDendrogramPlot = withCanvas(DendrogramBase, "plot dendrogram");
const SVGDendrogramPlot = withSVG(DendrogramBase, "plot dendrogram");

/**
 * Represents a Dendrogram plot, a tree of nodes built from the fields listed in `categories`, laid out
 * left-to-right with every leaf aligned at the same depth. Used internally by `<Dendrogram>` - use that
 * unless you need to compose the plot into a chart of your own
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The DendrogramPlot component
 */
export function DendrogramPlot({ useCanvas = false, ...props }: IDendrogramPlotProps) {
    if (useCanvas) {
        return <CanvasDendrogramPlot {...props} />;
    }

    return <SVGDendrogramPlot {...props} />;
}

DendrogramPlot.requiresVirtualCanvas = true;
DendrogramPlot.isPlot = true;
