import { chartSelectors, d3, eventActions, getXYFromTransform, IState } from "@chart-io/core";
import type { IColor, IDispatch, IFocused, IScale, ITheme } from "@chart-io/core";

import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";

import { redrawCanvas } from "../renderCanvas";

export interface IColumnFocusProps {
    /**
     * The redux store dispatch function
     */
    dispatch: IDispatch;
    /**
     * The datum that is currently focused
     */
    focused?: IFocused;
    /**
     * The theme for the chart
     */
    theme: ITheme;
    /**
     * The scale to use for the XAxis
     */
    xScale: IScale;
    /**
     * True if the columns are grouped
     */
    grouped?: boolean;
    /**
     * An HTML Canvas if the plot is rendering to canvas instead of SVG. Omit (or leave undefined) for SVG,
     * where the browser already repaints the highlighted node's style change on its own
     */
    canvas?: HTMLCanvasElement;
    /**
     * The width of the chart
     */
    width?: number;
    /**
     * The height of the chart
     */
    height?: number;
    /**
     * The (detached) layer holding the nodes to redraw, if this plot is using Canvas
     */
    layer?: React.MutableRefObject<Element>;
}

/**
 * Helper function to manage markers & droplines for a selected datum on the Column plot
 * @return              A function to set the focused datum
 */
function focus({ dispatch, focused, theme, xScale, grouped = false, canvas, width, height, layer }: IColumnFocusProps) {
    if (!focused) return;

    // Get the appropriate attributes
    const { element } = focused;
    const selection = d3.select(element) as d3.Selection<any, unknown, null, undefined>;
    const fill = selection.style("fill");
    const y = +selection.attr("y");
    const x = +selection.attr("x");
    const tranformX =
        grouped === false ? 0 : getXYFromTransform(d3.select(selection.node().parentNode).attr("transform")).x;

    selection.style("opacity", theme.series.selectedOpacity);
    redrawCanvas(canvas, width, height, layer);

    const horizontalDropline = {
        isHorizontal: true,
        color: fill as IColor,
        x1: x + tranformX,
        x2: xScale.range()[0] as number,
        y1: y,
        y2: y,
    };

    dispatch(eventActions.addDropline(horizontalDropline));

    return () => {
        selection.style("opacity", theme.series.opacity);
        redrawCanvas(canvas, width, height, layer);
        dispatch(eventActions.removeDropline(horizontalDropline));
    };
}

/**
 * Handles the user interacting with a DataPoint on the Column chart and the need to display a tooltip
 * @param  xScale     The d3 scale for the x-axis
 * @param  theme      The theme for the chart
 * @param  grouped    Whether the data on the chart is grouped
 * @param  canvas     An HTML Canvas if the plot is rendering to canvas instead of SVG
 * @param  layer      The (detached) layer holding the nodes to redraw, if this plot is using Canvas
 * @return            A function to set the focused datum
 */
export const useFocused = ({
    xScale,
    theme,
    grouped,
    canvas,
    layer,
}: Omit<IColumnFocusProps, "dispatch" | "focused" | "width" | "height">) => {
    const { dispatch } = useStore();
    const [focused, setFocused] = useState(null);
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));

    useEffect(() => {
        return focus({ dispatch, xScale, focused, theme, grouped, canvas, width, height, layer });
    }, [dispatch, focused, xScale, theme.series.selectedOpacity, canvas, width, height, layer]);

    return setFocused;
};
