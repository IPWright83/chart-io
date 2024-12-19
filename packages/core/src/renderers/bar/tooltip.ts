import { IColor, IDatum, IMouseEvent } from "@chart-io/types";

import type { IDispatch } from "../../store";
import { eventActions } from "../../store";

export interface IBarTooltipProps {
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
     * The keys of the fields used for the x position
     */
    xs: string[];
    /**
     * The key of the field used for the y position
     */
    y: string;
}

/**
 * Helper function to manage tooltips for a selected datum on the Bar plot
 * @return              A function to set the focused datum
 */
export function tooltip({ dispatch, xs, y, datum, colors, event }: IBarTooltipProps) {
    if (!datum) return;

    // Only use border colors for a single item
    if (colors && colors.length === 1) {
        dispatch(eventActions.setTooltipBorderColor(colors[0]));
    }

    // Common x value
    const tooltipItemX = {
        datum,
        name: y,
        value: datum[y],
    };
    dispatch(eventActions.addTooltipItem(tooltipItemX));

    const xTooltipItems = xs.map((x, index) => ({
        datum,
        name: x,
        value: datum[x],
        icon: "square" as const,
        fill: colors[index],
    }));

    xTooltipItems.forEach((x) => {
        dispatch(eventActions.addTooltipItem(x));
    });

    dispatch(eventActions.setPositionEvent({ x: event.offsetX, y: event.offsetY }));

    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));

        xTooltipItems.forEach((x) => {
            dispatch(eventActions.removeTooltipItem(x));
        });
    };
}
