import {
    IColor,
    ICoordinate,
    IData,
    IInvertScale,
    IMouseEventType,
    INumericValue,
    IScale,
    ITooltipItem,
} from "@chart-io/types";
import { d3 } from "../../d3";

import type { IDispatch } from "../../store";
import { eventActions } from "../../store";
import { getDistance } from "../../utils";

export interface IStackedAreaTooltipProps {
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
     * The colors of the data point
     */
    colors: IColor[];
    /**
     * The key of the field used for the x position
     */
    x: string;
    /**
     * The keys of the fields used for the y position
     */
    ys: string[];
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
export function stackedTooltip({
    dispatch,
    eventMode,
    colors,
    x,
    ys,
    data,
    xScale,
    yScale,
    position,
}: IStackedAreaTooltipProps) {
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

    // Common x value
    const tooltipItemX = {
        datum,
        name: x,
        value: datum[x],
    };
    dispatch(eventActions.addTooltipItem(tooltipItemX));

    const cx = xScale(xValue);

    const yTooltipItems = ys.reduce<ITooltipItem[]>((result, y, index) => {
        // Need to account for the stacking when calculating the distance to the point
        const cy = result.reduce((sum, r) => sum + +r.value, 0) + +datum[y];

        const item = {
            datum,
            name: y,
            value: datum[y],
            icon: "square" as const,
            fill: colors[index],
            distance: getDistance(position.x, position.y, cx, yScale(cy as INumericValue)),
        };

        return [...result, item];
    }, []);

    yTooltipItems.forEach((y) => {
        dispatch(eventActions.addTooltipItem(y));
    });

    dispatch(eventActions.setPositionEvent(position));

    // Clean up operations on exit
    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));

        yTooltipItems.forEach((y) => {
            dispatch(eventActions.removeTooltipItem(y));
        });
    };
}
