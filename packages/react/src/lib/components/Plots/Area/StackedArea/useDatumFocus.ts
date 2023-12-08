import * as d3 from "@chart-io/d3";
import { eventActions, getDistance, IDispatch } from "@chart-io/core";
import type { IColor, ICoordinate, IData, IMouseEventType, INumericValue, IScale } from "@chart-io/types";

import { useEffect } from "react";

const defaultValues = {
    markers: [],
    horizontalDroplines: [],
    verticalDroplines: [],
    sum: 0,
};

/**
 * Responds to events from an event layer to focus the nearest datum
 * @param  dispatch     The redux store dispatch function
 * @param  layer        The layer we're updating to from a React useRef
 * @param  x            The key of the field used for the x position
 * @param  ys           The keys of the fields used for y position
 * @param  xScale       The d3 scale for the x axis
 * @param  yScale       The d3 scale for the y axis
 * @param  data         The complete dataset for the plot
 * @param  eventMode    The event mode from the selector one of ["NONE", "ENTER", "MOVE"]
 * @param  position     The { x, y } position of the mouse
 * @param  colors       The colors for the plot
 */
export function useDatumFocus(
    dispatch: IDispatch,
    layer: React.MutableRefObject<Element>,
    x: string,
    ys: string[],
    xScale: IScale,
    yScale: IScale,
    data: IData,
    eventMode: IMouseEventType,
    position: ICoordinate,
    colors: IColor[],
) {
    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (!layer.current || !xScale || !yScale || !data) {
            // istanbul ignore next
            return;
        }

        // We need the invert function to be able to do this
        // @ts-expect-error: This is a runtime check
        if (!xScale.invert) {
            // istanbul ignore next
            return;
        }

        // Don't run for the EXIT event
        if (eventMode === "NONE") {
            d3.select(layer.current).selectAll("circle").remove();
            return;
        }

        // Work out the datum that we're closet to
        // @ts-expect-error: This has already been protected against
        const xValue = xScale.invert(position.x);
        const index = d3.bisector((d) => d[x]).center(data, xValue);
        const datum = data[index];

        // Get the appropriate attributes
        const cx = xScale(datum[x] as INumericValue);

        const { markers, horizontalDroplines, verticalDroplines } = ys.reduce((result, y, i) => {
            // @ts-ignore TODO: Not sure how to fix this
            const sum = result.sum + datum[y];
            const cy = yScale(sum);
            const color = d3.color(colors[i].toString()).darker();

            const distance = getDistance(position.x, position.y, cx, cy);

            const marker = { fill: color, r1: 5, r2: 5, cx, cy, distance };
            const horizontalDropline = {
                isHorizontal: true,
                color,
                x1: cx,
                x2: xScale.range()[0],
                y1: cy,
                y2: cy,
                distance,
            };
            const verticalDropline = {
                isVertical: true,
                color,
                x1: cx,
                x2: cx,
                y1: cy,
                y2: yScale.range()[0],
                distance,
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
        // prettier-ignore
        return () => {
            markers.forEach((marker) => dispatch(eventActions.removeMarker(marker)));
            horizontalDroplines.forEach((horizontalDropline) => dispatch(eventActions.removeDropline(horizontalDropline))            );
            verticalDroplines.forEach((verticalDropline) => dispatch(eventActions.removeDropline(verticalDropline)));
        };
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, ys, data, layer, colors]);
}
