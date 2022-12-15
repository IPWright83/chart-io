import * as d3 from "d3";
import { useEffect } from "react";

import { eventActions } from "../../../../store";
import { isNullOrUndefined } from "../../../../utils";

/**
 * Responds to events from an event layer to focus the nearest datum
 * @param  {Function} dispatch The redux store dispatch function
 * @param  {Object} layer      The layer we're updating to from a React useRef
 * @param  {String} x          The key of the field used for the x position
 * @param  {String} y          The key of the field used for the y position
 * @param  {d3.Scale} xScale   The d3 scale for the x axis
 * @param  {d3.Scale} yScale   The d3 scale for the y axis
 * @param  {Object[]} data        The complete dataset for the plot
 * @param  {String} eventMode  The event mode from the selector one of ["NONE", "ENTER", "MOVE"]
 * @param  {Object} position   The { x, y } position of the mouse
 * @param  {String} color      The color of the plot
 */
const useDatumFocus = (dispatch, layer, x, y, xScale, yScale, data, eventMode, position, color) => {
    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (!layer.current || !xScale || !yScale || !data) {
            return;
        }

        // We need the invert function to be able to do this
        if (!xScale.invert) {
            return;
        }

        // Don't run for the EXIT event
        if (eventMode === "NONE") {
            d3.select(layer.current).selectAll("circle").remove();
            return;
        }

        // Work out the datum that we're closet to
        const xValue = xScale.invert(position.x);
        const index = d3.bisector((d) => d[x]).center(data, xValue);
        const datum = data[index];

        if (isNullOrUndefined(datum[y])) {
            return;
        }

        // Get the appropriate attributes
        const cx = xScale(datum[x]);
        const cy = yScale(datum[y]);
        const fill = color;

        const marker = { fill, cx, cy };
        const horizontalDropline = {
            isHorizontal: true,
            color: fill,
            x1: cx,
            x2: xScale.range()[0],
            y1: cy,
            y2: cy,
        };
        const verticalDropline = {
            isVertical: true,
            color: fill,
            x1: cx,
            x2: cx,
            y1: cy,
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
    }, [eventMode, position.x, position.y, xScale, yScale, x, y, data, layer, color]);
};

export { useDatumFocus };
