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

    // // None of the plots support brushing
    // if (!needHorizontalBrush && !needVerticalBrush) {
    //     return null;
    // }

    // // Special case for an XYBrush (usually a scatter zoom)
    // if (needHorizontalBrush && needVerticalBrush) {
    //     return null; // <ScatterBrush />;
    // }

    const supportsHorizontalBrush = plots.some((c) => c.type.brush.horizontal);
    if (supportsHorizontalBrush) {
        return <HorizontalBrush height={size} plots={plots} />;
    }
}
