import { IColor, IDatum, IMouseEvent } from "@Types";

import type { IDispatch } from "../../store";
import { eventActions } from "../../store";

export interface IColumnTooltipProps {
    /**
     * The redux store dispatch function
     */
    dispatch: IDispatch;
    /**
     * The focused data point
     */
    datum: IDatum;
    /**
     * The color of the data point
     */
    colors: IColor[];
    /**
     * The event that initiated the request to display the tooltip
     */
    event: IMouseEvent;
    /**
     * The key of the field used for the x position
     */
    x: string;
    /**
     * The keys of the fields used for the y position
     */
    ys: string[];
}

/**
 * Helper function to manage tooltips for a selected datum on the Column plot
 * @return              A function to set the focused datum
 */
export function tooltip({ dispatch, x, ys, datum, colors, event }: IColumnTooltipProps) {
    if (!datum) return;

    // Only use border colors for a single item
    if (colors && colors.length === 1) {
        dispatch(eventActions.setTooltipBorderColor(colors[0]));
    }

    // Common x value
    const tooltipItemX = {
        datum,
        name: x,
        value: datum[x],
    };
    dispatch(eventActions.addTooltipItem(tooltipItemX));

    const yTooltipItems = ys.map((y, index) => ({
        datum,
        name: y,
        value: datum[y],
        icon: "square" as const,
        fill: colors[index],
    }));

    yTooltipItems.forEach((y) => {
        dispatch(eventActions.addTooltipItem(y));
    });

    dispatch(eventActions.setPositionEvent({ x: event.offsetX, y: event.offsetY }));

    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));

        yTooltipItems.forEach((y) => {
            dispatch(eventActions.removeTooltipItem(y));
        });
    };
}
