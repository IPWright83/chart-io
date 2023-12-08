import * as d3 from "@chart-io/d3";
import { IColor, ICoordinate, IMouseEventType, IScale, ITheme, IData } from "@chart-io/types";

import type { IDispatch } from "../../store";
import { eventActions } from "../../store";
import { isNullOrUndefined, getDistance } from "../../utils";

export interface ILineTooltipProps {
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
 * Helper function to manage tooltips for a selected datum on the Bar plot
 * @return              A function to set the focused datum
 */
export function tooltip({
    dispatch,
    x,
    y,
    color,
    xScale,
    position,
    yScale,
    data,
    layer,
    eventMode,
}: ILineTooltipProps) {
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

    const cx = xScale(datum[x] as number);
    const cy = yScale(datum[y] as number);
    const distance = getDistance(position.x, position.y, cx, cy);

    // Common x value
    const tooltipItemX = {
        datum,
        name: x,
        value: datum[x],
    };
    dispatch(eventActions.addTooltipItem(tooltipItemX));

    const tooltipItemY = {
        datum,
        name: y,
        value: datum[y],
        icon: "square" as const,
        fill: color,
        distance,
    };
    dispatch(eventActions.addTooltipItem(tooltipItemY));
    dispatch(eventActions.setPositionEvent(position.x, position.y));

    // Clean up operations on exit
    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));
        dispatch(eventActions.removeTooltipItem(tooltipItemY));
    };
}
