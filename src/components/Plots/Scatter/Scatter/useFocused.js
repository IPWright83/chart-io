import * as d3 from "d3";
import { useState, useEffect } from "react";

import { eventActions } from "../../../../store";

/**
 * Handles the user interacting with a DataPoint on the Scatter chart
 * @param  {Function} options.dispatch     The redux store dispatch function
 * @param  {d3.Scale} options.xScale       The d3 scale for the x-axis
 * @param  {d3.Scale} options.yScale       The d3 scale for the y-axis
 * @return {Function}                      A function to set the focused datum
 */
const useFocused = ({ dispatch, xScale, yScale }) => {
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        if (!focused) return;

        // Get the appropriate attributes
        const { element } = focused;
        const selection = d3.select(element);
        const r = +selection.attr("r");
        const cx = +selection.attr("cx");
        const cy = +selection.attr("cy");
        const fill = selection.style("fill");
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
};

export { useFocused };
