import { IColor, IDatum, IMouseEvent } from "@chart-io/types";

import { eventActions } from "../../store";
import type { IDispatch } from "../../store";

export interface IScatterTooltipProps {
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
    color: IColor;
    /**
     * The event that initiated the request to display the tooltip
     */
    event: IMouseEvent;
    /**
     * The key of the field used for the x position
     */
    x: string;
    /**
     * The key of the field used for the y position
     */
    y: string;
}

/**
 * Helper function to manage tooltips for a selected datum on the Scatter plot
 * @return              A function to set the focused datum
 */
export function tooltip({ dispatch, x, y, datum, color, event }: IScatterTooltipProps) {
    if (!datum) return;

    const tooltipItemX = {
        datum,
        name: x,
        value: datum[x],
    };

    const tooltipItemY = {
        datum,
        name: y,
        icon: "circle" as const,
        fill: color,
        value: datum[y],
    };

    dispatch(eventActions.setTooltipBorderColor(color));
    dispatch(eventActions.addTooltipItem(tooltipItemX));
    dispatch(eventActions.addTooltipItem(tooltipItemY));
    dispatch(eventActions.setPositionEvent(event?.offsetX, event?.offsetY));

    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));
        dispatch(eventActions.removeTooltipItem(tooltipItemY));
    };
}
