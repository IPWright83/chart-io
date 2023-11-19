import * as d3 from "@chart-io/d3";
import type { IColor, ICoordinate, IData, IMouseEventType, INumericValue, IScale } from "@chart-io/types";
import { useEffect } from "react";

import { eventActions, IDispatch } from "../../../../store";
import { getDistance, isNullOrUndefined } from "../../../../utils";

/**
 * Responds to events from an event layer to focus the nearest datum
 * @param  dispatch     The redux store dispatch function
 * @param  layer        The layer we're updating to from a React useRef
 * @param  x            The key of the field used for the x position
 * @param  y            The key of the field used for the y position
 * @param  xScale       The d3 scale for the x axis
 * @param  yScale       The d3 scale for the y axis
 * @param  data         The complete dataset for the plot
 * @param  eventMode    The event mode from the selector one of ["NONE", "ENTER", "MOVE"]
 * @param  position     The { x, y } position of the mouse
 * @param  color        The color of the plot
 */
export function useDatumFocus(
    dispatch: IDispatch,
    layer: React.MutableRefObject<Element>,
    x: string,
    y: string,
    xScale: IScale,
    yScale: IScale,
    data: IData,
    eventMode: IMouseEventType,
    position: ICoordinate,
    color: IColor,
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

        if (isNullOrUndefined(datum[y])) {
            // istanbul ignore next
            return;
        }

        // Get the appropriate attributes
        const cx = +xScale(datum[x] as INumericValue);
        const cy = +yScale(datum[y] as INumericValue);
        const fill = color;
        const distance = getDistance(position.x, position.y, cx, cy);

        const marker = { fill, cx, cy, distance };
        const horizontalDropline = {
            isHorizontal: true,
            color: fill,
            x1: cx,
            x2: xScale.range()[0],
            y1: cy,
            y2: cy,
            distance,
        };

        const verticalDropline = {
            isVertical: true,
            color: fill,
            x1: cx,
            x2: cx,
            y1: cy,
            y2: yScale.range()[0],
            distance,
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
}
