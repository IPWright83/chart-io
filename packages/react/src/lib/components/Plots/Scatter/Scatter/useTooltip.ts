import { eventActions } from "@chart-io/core";
import type { IColor, IDatum, IDispatch, IMouseEvent } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

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

interface ITooltipParams {
    datum: IDatum;
    event: IMouseEvent;
    fillColor: IColor;
}

/**
 * Helper function to manage tooltips for a selected datum on the Scatter plot
 * @return              A function to set the focused datum
 */
function tooltip({ dispatch, x, y, datum, color, event }: IScatterTooltipProps) {
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
    dispatch(eventActions.setPositionEvent({ x: event?.offsetX, y: event?.offsetY }));

    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));
        dispatch(eventActions.removeTooltipItem(tooltipItemY));
    };
}

/**
 * Handles the user interacting with a DataPoint on the Scatter chart and the need to display a tooltip
 * @param  x            The key for the x value
 * @param  y            The key for the y value
 * @return              A function to set the tooltip datum
 */
export function useTooltip({ x, y }: Omit<IScatterTooltipProps, "dispatch" | "color" | "event" | "datum">) {
    const { dispatch } = useStore();
    const [datum, setDatum] = useState(null);
    const [color, setColor] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        return tooltip({ dispatch, datum, color, event: positionEvent, x, y });
    }, [dispatch, color, x, y, positionEvent]);

    /**
     * A function to set the tooltip parameters
     * @param  tooltipParams    The configuration for the tooltip
     */
    return (tooltipParams: ITooltipParams) => {
        if (!tooltipParams) {
            setDatum(undefined);
            setColor(undefined);
            setPositionEvent(undefined);
            return;
        }

        const { datum, event, fillColor } = tooltipParams;

        setDatum(datum);
        setColor(fillColor);
        setPositionEvent(event);
    };
}
