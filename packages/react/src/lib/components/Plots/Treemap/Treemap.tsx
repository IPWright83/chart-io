import React from "react";

import { withCanvas, withRectangularPlot, withSVG } from "../../../hoc";

import { ITreemapBaseProps, TreemapBase } from "./TreemapBase";

export interface ITreemapProps
    extends Omit<ITreemapBaseProps, "layer" | "canvas" | "plotLeft" | "plotTop" | "plotWidth" | "plotHeight"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasTreemap = withCanvas(withRectangularPlot<ITreemapProps>(TreemapBase), "plot treemap");
const SVGTreemap = withSVG(withRectangularPlot<ITreemapProps>(TreemapBase), "plot treemap");

/**
 * Represents a Treemap plot, subdividing the plot area into nested rectangles built from the fields
 * listed in `categories`, sized proportionally to `value`
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Treemap plot component
 */
export function Treemap({ useCanvas = false, ...props }: ITreemapProps) {
    if (useCanvas) {
        return <CanvasTreemap {...props} />;
    }

    return <SVGTreemap {...props} />;
}

Treemap.requiresVirtualCanvas = true;
Treemap.isPlot = true;
