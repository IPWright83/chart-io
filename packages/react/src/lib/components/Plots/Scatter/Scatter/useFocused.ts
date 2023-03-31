import * as d3 from "@d3-chart/d3";
import { IColor, IScale } from "@d3-chart/types";
import { useEffect, useState } from "react";

import { eventActions, IDispatch } from "../../../../store";

/**
 * Handles the user interacting with a DataPoint on the Scatter chart
 * @param  dispatch     The redux store dispatch function
 * @param  xScale       The d3 scale for the x-axis
 * @param  yScale       The d3 scale for the y-axis
 * @return              A function to set the focused datum
 */
export function useFocused(dispatch: IDispatch, xScale: IScale | undefined, yScale: IScale | undefined) {
    const [focused, setFocused] = useState(null);

    useEffect(() => {
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
            x2: xScale.range()[0],
            y1: cy,
            y2: cy,
        };
        const verticalDropline = {
            isVertical: true,
            color: fill,
            x1: cx,
            x2: cx,
            y1: cy + markerRadius,
            y2: yScale.range()[0],
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
    }, [dispatch, xScale, yScale, focused]);

    return setFocused;
}
