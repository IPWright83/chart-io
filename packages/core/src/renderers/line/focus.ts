import * as d3 from "@chart-io/d3";
import { IColor, ICoordinate, IMouseEventType, IScale, ITheme, IData } from "@chart-io/types";

import type { Selection } from "d3-selection";

import type { IDispatch } from "../../store";
import { eventActions } from "../../store";
import type { IFocused } from "../../types";
import { isNullOrUndefined, getDistance, getXYFromTransform } from "../../utils";

export interface ILineFocusProps {
    /**
     * The color of the plot
     */
    color: IColor;
    /**
     * The complete dataset for the plot
     */
    data: IData;
    /**
     * The redux store dispatch function
     */
    dispatch: IDispatch;
    /**
     * The event mode from the selector one of ["NONE", "ENTER", "MOVE"]
     */
    eventMode: IMouseEventType;
    /**
     * The layer containing the line plot
     */
    layer: Element;
    /**
     * The { x, y } position of the mouse
     */
    position: ICoordinate;
    /**
     * The key of the field used for the x position
     */
    x: string;
    /**
     * The key of the field used for the y position
     */
    y: string;
    /**
     * The d3 scale for the x axis
     */
    xScale: IScale | undefined;
    /**
     * The d3 scale for the y axis
     */
    yScale: IScale | undefined;
}

/**
 * Helper function to manage markers & droplines for a selected datum on the Bar plot
 * @return              A function to set the focused datum
 */
export function focus({ dispatch, x, y, color, xScale, position, yScale, data, layer, eventMode }: ILineFocusProps) {
    if (!layer || !xScale || !yScale || !data) {
        // istanbul ignore next
        return;
    }

    // We need the invert function to be able to do this
    // @ts-expect-error: We're handling a runtime validation so this is fine
    if (!xScale.invert) {
        // istanbul ignore next
        return;
    }

    // Don't run for the EXIT event
    if (eventMode === "NONE") {
        d3.select(layer).selectAll("circle").remove();
        return;
    }

    // Work out the datum that we're closet to
    // @ts-expect-error: We've already aserted that invert exists
    const xValue = xScale.invert(position.x);
    const index = d3.bisector((d) => d[x]).center(data, xValue);
    const datum = data[index];

    if (isNullOrUndefined(datum[y])) {
        // istanbul ignore next
        return;
    }

    // Get the appropriate attributes
    const cx = xScale(datum[x] as number);
    const cy = yScale(datum[y] as number);
    const distance = getDistance(position.x, position.y, cx, cy);
    const fill = color;

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
}
