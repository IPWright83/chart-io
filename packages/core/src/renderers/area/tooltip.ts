import { d3 } from "../../d3";
import type { IDispatch } from "../../store";
import { eventActions } from "../../store";
import { IColor, ICoordinate, IData, IInvertScale, IMouseEventType, INumericValue, IScale } from "../../types";
import { getDistance, isNullOrUndefined } from "../../utils";

export interface IAreaTooltipProps {
    /**
     * The redux store dispatch function
     */
    dispatch: IDispatch;
    /**
     * The event mode from the selector one of ["NONE", "ENTER", "MOVE"]
     */
    eventMode: IMouseEventType;
    /**
     * The { x, y } position of the mouse
     */
    position: ICoordinate;
    /**
     * The complete dataset for the plot
     */
    data: IData;
    /**
     * The color of the data point
     */
    color: IColor;
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
 * Helper function to manage tooltips for a selected datum on the Column plot
 * @return              A function to set the focused datum
 */
export function tooltip({ dispatch, eventMode, color, x, y, data, xScale, yScale, position }: IAreaTooltipProps) {
    // We need the invert function to be able to do this
    if (!(xScale as IInvertScale).invert) {
        // istanbul ignore next
        return;
    }

    // Don't run for the EXIT event
    if (eventMode === "NONE") {
        return;
    }

    // Work out the datum that we're closet to
    const xValue = (xScale as IInvertScale).invert(position.x);
    const index = d3.bisector((d) => d[x]).center(data, xValue);
    const datum = data[index];

    if (isNullOrUndefined(datum[y])) {
        // istanbul ignore next
        return;
    }

    const cx = xScale(datum[x] as INumericValue);
    const cy = yScale(datum[y] as INumericValue);
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
    dispatch(eventActions.setPositionEvent(position));

    // Clean up operations on exit
    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));
        dispatch(eventActions.removeTooltipItem(tooltipItemY));
    };
}
