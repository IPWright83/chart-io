import * as d3 from "@chart-io/d3";
import { IColor, IFocused, IScale } from "@chart-io/types";

import type { IDispatch } from "../../store";
import { eventActions } from "../../store";

export interface IScatterFocusProps {
    /**
     * The redux store dispatch function
     */
    dispatch: IDispatch;
    /**
     * The d3 scale for the x-axis
     */
    xScale: IScale | undefined;
    /**
     * The d3 scale for the y-axis
     */
    yScale: IScale | undefined;
    /**
     * The datum that is currently focused
     */
    focused: IFocused;
}

/**
 * Helper function to manage markers & droplines for a selected datum on the Scatter plot
 * @return              A function to set the focused datum
 */
export function focus({ dispatch, xScale, yScale, focused }: IScatterFocusProps) {
    if (!focused) return;

    // Get the appropriate attributes
    const { element } = focused;
    const selection = d3.select(element);
    const r = +selection.attr("r");
    const cx = +selection.attr("cx");
    const cy = +selection.attr("cy");
    const fill = selection.style("fill") as IColor;
    const markerRadius = r + 4;

    const marker = { stroke: fill, r1: r, r2: markerRadius, cx, cy };
    const horizontalDropline = {
        isHorizontal: true,
        color: fill,
        x1: cx - markerRadius,
        x2: xScale.range()[0] as number,
        y1: cy,
        y2: cy,
    };

    const verticalDropline = {
        isVertical: true,
        color: fill,
        x1: cx,
        x2: cx,
        y1: cy + markerRadius,
        y2: yScale.range()[0] as number,
    };

    dispatch(eventActions.addMarker(marker));
    dispatch(eventActions.addDropline(horizontalDropline));
    dispatch(eventActions.addDropline(verticalDropline));

    // Clean up operations on exit
    return () => {
        dispatch(eventActions.removeMarker(marker));
        dispatch(eventActions.removeDropline(horizontalDropline));
        dispatch(eventActions.removeDropline(verticalDropline));
    };
}
