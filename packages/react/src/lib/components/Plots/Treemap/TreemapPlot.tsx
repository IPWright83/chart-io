import React from "react";

import { withCanvas, withSVG } from "../../../hoc";

import { ITreemapBaseProps, TreemapBase } from "./TreemapBase";

export interface ITreemapPlotProps extends Omit<ITreemapBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasTreemapPlot = withCanvas(TreemapBase, "plot treemap");
const SVGTreemapPlot = withSVG(TreemapBase, "plot treemap");

/**
 * Represents a Treemap plot, subdividing the plot area into nested rectangles built from the fields
 * listed in `categories`, sized proportionally to `value`. Used internally by `<Treemap>` - use that
 * unless you need to compose the plot into a chart of your own
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The TreemapPlot component
 */
export function TreemapPlot({ useCanvas = false, ...props }: ITreemapPlotProps) {
    if (useCanvas) {
        return <CanvasTreemapPlot {...props} />;
    }

    return <SVGTreemapPlot {...props} />;
}

TreemapPlot.requiresVirtualCanvas = true;
TreemapPlot.isPlot = true;
