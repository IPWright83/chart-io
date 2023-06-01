import React from "react";

import { getBrushPlots } from "./getBrushPlots";
import { HorizontalZoomBrush } from "./HorizontalZoomBrush";

export interface IZoomBrushProps {
    /**
     * The child components for the chart
     */
    children?: JSX.Element | JSX.Element[];
    /**
     * The number of pixels the brush should take. This is the height
     * for a horizontal brush or the width for a vertical brush.
     */
    size?: number;

    /**
     * The type of brush to use. Either an "inline" brush which sits beside the
     * chart or an "overlay" brush which sits on top of the chart
     */
    type: "inline" | "overlay";
}

/**
 * Represents a zoomable Brush component on the chart
 * @return The Brush component
 */
export function ZoomBrush({ children, size = 60, type = "overlay" }: IZoomBrushProps) {
    // Find all the interactive plots
    const plots = getBrushPlots(children);

    const needsXBrush = plots.some((c) => c.type.brush.horizontal);
    // const needsYBrush = plots.some((c) => c.type.brush.vertical);

    if (type === "inline" && needsXBrush) {
        return <HorizontalZoomBrush height={size} plots={plots} />;
    }
}
