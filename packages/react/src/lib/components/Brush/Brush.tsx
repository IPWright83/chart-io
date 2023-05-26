import React from "react";

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

    const supportsHorizontalBrush = plots.some((c) => c.type.brush.horizontal);
    if (supportsHorizontalBrush) {
        return <HorizontalBrush height={size} plots={plots} />;
    }
}
