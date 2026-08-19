import { chartSelectors, d3, eventActions, getXYFromTransform, IState } from "@chart-io/core";
import type { IColor, IDispatch, IFocused, IScale, ITheme } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";

import type { ICanvasRedraw } from "../useFocused";
import { redrawCanvas } from "../renderCanvas";

export interface IBarFocusProps {
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
     * The scale to use for the YAxis
     */
    yScale: IScale;
    /**
     * True if the columns are grouped
     */
    grouped?: boolean;
    /**
     * The details needed to redraw the Canvas, if this plot is using one
     */
    canvasRedraw?: ICanvasRedraw;
}

/**
 * Helper function to manage markers & droplines for a selected datum on the Bar plot
 * @return              A function to set the focused datum
 */
function focus({ dispatch, focused, theme, yScale, grouped = false, canvasRedraw }: IBarFocusProps) {
    if (!focused) return;

    const { canvas, width, height, layer } = canvasRedraw ?? {};

    // Get the appropriate attributes
    const { element } = focused;
    const selection = d3.select(element) as d3.Selection<any, unknown, null, undefined>;
    const fill = selection.style("fill");
    const y = +selection.attr("y");
    const x = +selection.attr("x");
    const barWidth = +selection.attr("width");
    const tranformY =
        grouped === false ? 0 : getXYFromTransform(d3.select(selection.node().parentNode).attr("transform")).y;

    selection.style("opacity", theme.series.selectedOpacity);
    redrawCanvas(canvas, width, height, layer);

    const verticalDropline = {
        isVertical: true,
        color: fill as IColor,
        x1: x + barWidth,
        x2: x + barWidth,
        y1: y + tranformY,
        y2: yScale.range()[0] as number,
    };

    dispatch(eventActions.addDropline(verticalDropline));

    return () => {
        selection.style("opacity", theme.series.opacity);
        redrawCanvas(canvas, width, height, layer);
        dispatch(eventActions.removeDropline(verticalDropline));
    };
}

/**
 * Handles the user interacting with a DataPoint on the Bar chart and the need to display a tooltip
 * @param  yScale         The d3 scale for the x-axis
 * @param  theme          The theme for the chart
 * @param  grouped        Whether the data on the chart is grouped
 * @param  canvasRedraw   The Canvas/layer to redraw, if this plot is using one. The chart's width/height
 *                        are looked up from the store, so only `canvas`/`layer` need to be provided
 * @return                A function to set the focused datum
 */
export const useFocused = ({
    yScale,
    theme,
    grouped,
    canvasRedraw,
}: Omit<IBarFocusProps, "dispatch" | "focused" | "canvasRedraw"> & {
    canvasRedraw?: Omit<ICanvasRedraw, "width" | "height">;
}) => {
    const { dispatch } = useStore();
    const [focused, setFocused] = useState(null);
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const { canvas, layer } = canvasRedraw ?? {};

    useEffect(() => {
        return focus({
            dispatch,
            yScale,
            focused,
            theme,
            grouped,
            canvasRedraw: canvasRedraw && { canvas, width, height, layer },
        });
    }, [dispatch, focused, yScale, theme.series.selectedOpacity, canvas, width, height, layer]);

    return setFocused;
};
