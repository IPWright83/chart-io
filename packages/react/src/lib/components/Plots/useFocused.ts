import { d3 } from "@chart-io/core";
import type { IFocused, ITheme } from "@chart-io/core";

import React, { useEffect, useState } from "react";

import { redrawCanvas } from "./renderCanvas";

export interface ICanvasRedraw {
    /**
     * An HTML Canvas if the plot is rendering to canvas instead of SVG. Omit (or leave undefined) for SVG,
     * where the browser already repaints the highlighted node's style change on its own
     */
    canvas?: HTMLCanvasElement;
    /**
     * The width of the chart
     */
    width: number;
    /**
     * The height of the chart
     */
    height: number;
    /**
     * The (detached) layer holding the nodes to redraw
     */
    layer: React.MutableRefObject<Element>;
}

/**
 * Handles the user interacting with a slice on a Pie/Donut/StackedDonut plot and the need to highlight it.
 * For SVG this is just a CSS opacity change the browser repaints on its own, but for Canvas the visible
 * bitmap needs to be explicitly redrawn - pass `canvasRedraw` to also highlight the slice there
 * @param  theme          The theme for the chart
 * @param  canvasRedraw   The details needed to redraw the Canvas, if this plot is using one
 * @return                A function to set the focused slice
 */
export const useFocused = (theme: ITheme, canvasRedraw?: ICanvasRedraw) => {
    const [focused, setFocused] = useState<IFocused>(null);
    const { canvas, width, height, layer } = canvasRedraw ?? {};

    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element);
        selection.style("opacity", theme.series.selectedOpacity);
        redrawCanvas(canvas, width, height, layer);

        return () => {
            selection.style("opacity", theme.series.opacity);
            redrawCanvas(canvas, width, height, layer);
        };
    }, [focused, theme.series.selectedOpacity, theme.series.opacity, canvas, width, height, layer]);

    return setFocused;
};
