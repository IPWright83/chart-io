import * as d3 from "d3";
import { useEffect } from "react";

import { eventActions } from "../../../../store";

const defaultValues = {
    markers: [],
    horizontalDroplines: [],
    verticalDroplines: [],
    sum: 0,
};

/**
 * Responds to events from an event layer to focus the nearest datum
 * @param  {Function} dispatch The redux store dispatch function
 * @param  {Object} layer      The layer we're updating to from a React useRef
 * @param  {String} x          The key of the field used for the x position
 * @param  {String[]} ys       The keys of the fields used for the y position
 * @param  {d3.Scale} xScale   The d3 scale for the x axis
 * @param  {d3.Scale} yScale   The d3 scale for the y axis
 * @param  {Object[]} data        The complete dataset for the plot
 * @param  {String} eventMode  The event mode from the selector one of ["NONE", "ENTER", "MOVE"]
 * @param  {Object} position   The { x, y } position of the mouse
 * @param  {String[]} colors      The color of the plot
 */
const useDatumFocus = (dispatch, layer, x, ys, xScale, yScale, data, eventMode, position, colors) => {
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

        // Get the appropriate attributes
        const cx = xScale(datum[x]);

        const { markers, horizontalDroplines, verticalDroplines } = ys.reduce((result, y, i) => {
            const sum = result.sum + datum[y];
            const cy = yScale(sum);
            const color = colors[i];

            const marker = { fill: color, r1: 5, r2: 5, cx, cy };
            const horizontalDropline = {
                isHorizontal: true,
                color,
                x1: cx,
                x2: xScale.range()[0],
                y1: cy,
                y2: cy,
            };
            const verticalDropline = {
                isVertical: true,
                color,
                x1: cx,
                x2: cx,
                y1: cy,
                y2: yScale.range()[0],
            };
            return {
                sum,
                markers: [...result.markers, marker],
                horizontalDroplines: [...result.horizontalDroplines, horizontalDropline],
                verticalDroplines: [...result.verticalDroplines, verticalDropline],
            };
        }, defaultValues);

        markers.forEach((marker) => dispatch(eventActions.addMarker(marker)));
        horizontalDroplines.forEach((horizontalDropline) => dispatch(eventActions.addDropline(horizontalDropline)));
        verticalDroplines.forEach((verticalDropline) => dispatch(eventActions.addDropline(verticalDropline)));

        // Clean up operations on exit
        return () => {
            markers.forEach((marker) => dispatch(eventActions.removeMarker(marker)));
            horizontalDroplines.forEach((horizontalDropline) =>
                dispatch(eventActions.removeDropline(horizontalDropline))
            );
            verticalDroplines.forEach((verticalDropline) => dispatch(eventActions.removeDropline(verticalDropline)));
        };
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, ys, data, layer, colors]);
};

export { useDatumFocus };
