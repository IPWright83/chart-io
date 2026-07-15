import type { IDispatch } from "../../store";
import { eventActions } from "../../store";
import { IColor, IDatum, IMouseEvent, IValue } from "../../types";

export interface IPieTooltipProps {
    /**
     * The redux store dispatch function
     */
    dispatch: IDispatch;
    /**
     * The focused data point
     */
    datum: IDatum;
    /**
     * The label to use for the tooltip item, typically the category for the slice
     */
    name: string;
    /**
     * The value to display for the tooltip item
     */
    value: IValue;
    /**
     * The color of the slice
     */
    color: IColor;
    /**
     * The event that initiated the request to display the tooltip
     */
    event: IMouseEvent;
}

/**
 * Helper function to manage tooltips for a selected slice on a Pie/Donut plot
 * @return              A function to clear up the tooltip
 */
export function tooltip({ dispatch, datum, name, value, color, event }: IPieTooltipProps) {
    if (!datum) return;

    if (color) {
        dispatch(eventActions.setTooltipBorderColor(color));
    }

    const tooltipItem = {
        datum,
        name,
        value,
        icon: "square" as const,
        fill: color,
    };

    dispatch(eventActions.addTooltipItem(tooltipItem));
    dispatch(eventActions.setPositionEvent({ x: event.offsetX, y: event.offsetY }));

    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItem));
    };
}
