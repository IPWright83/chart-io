import React from "react";
import { useSelector } from "react-redux";
import { chartSelectors, IState } from "../../store";

import { getBrushPlots } from "./getBrushPlots";
import { HorizontalBrush } from "./HorizontalBrush";

export interface IBrushProps {
    /**
     * The child components for the chart
     */
    children?: JSX.Element | JSX.Element[];
    /**
     * The number of pixels the brush should take. This is the height
     * for a horizontal brush or the width for a vertical brush.
     */
    size?: number;
}

/**
 * Represents a Brush component on the chart
 * @return The Brush component
 */
export function Brush({ children, size = 60 }: IBrushProps) {
    // Find all the interactive plots
    const plots = getBrushPlots(children);

    // Determine what type of Brush we need
    const needHorizontalBrush = plots.some((c) => c.type.brushHorizontal);
    const needVerticalBrush = plots.some((c) => c.type.brushVertical);

    console.log(plots, children);

    // // None of the plots support brushing
    // if (!needHorizontalBrush && !needVerticalBrush) {
    //     return null;
    // }

    // // Special case for an XYBrush (usually a scatter zoom)
    // if (needHorizontalBrush && needVerticalBrush) {
    //     return null; // <ScatterBrush />;
    // }

    if (needHorizontalBrush) {
        // return null;
        return <HorizontalBrush height={size} plots={plots} />;
    }

    //return <VerticalBrush />

    //React.cloneElement(c, {
    //  interactive: false,
    //        })
    // console.log(children);
    //children.filter(c => c.type.isPlot )

    /**
     *
     * const horizontalBrush = plots.any(p => p.horizontalBrush);
     * if (horizontalBrush) {
     *     width = chartSelectors.dimensions.width(s);
     *     height = 100;
     *
     *     brushScale = getScale(field).clone().range([0, height]);
     *     dispatch("set_brush_scale", brushScale, field);
     *
     *     renderPlots (interactive false)
     * }
     *
     *
     *
     *
     */

    // Is Vertical or Horizontal Brush?
    //     Line | Area | Column = horizontal
    //     Bar = Vertical
    //     Scatter = Both

    // If vertical width = 100, height = height
    // If horizontal height = 100, width = width

    // Clone plots
    // set interactive = false
    // set new scale

    // console.log(plots);

    return <g></g>;
}
