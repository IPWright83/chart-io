import React from "react";

import { withCanvas, withSVG } from "../../../hoc";

import { IWordCloudBaseProps, WordCloudBase } from "./WordCloudBase";

export interface IWordCloudPlotProps extends Omit<IWordCloudBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasWordCloudPlot = withCanvas(WordCloudBase, "plot word-cloud");
const SVGWordCloudPlot = withSVG(WordCloudBase, "plot word-cloud");

/**
 * Represents a WordCloud plot, sizing each word in the dataset's `category` field proportionally to
 * `value` and packing them into the available space without overlapping. Used internally by
 * `<WordCloud>` - use that unless you need to compose the plot into a chart of your own
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The WordCloudPlot component
 */
export function WordCloudPlot({ useCanvas = false, ...props }: IWordCloudPlotProps) {
    if (useCanvas) {
        return <CanvasWordCloudPlot {...props} />;
    }

    return <SVGWordCloudPlot {...props} />;
}

WordCloudPlot.requiresVirtualCanvas = true;
WordCloudPlot.isPlot = true;
