import { IColor, IDatum, IMouseEvent } from "@d3-chart/types";
import { useEffect, useState } from "react";

import { eventActions, IDispatch } from "../../../../store";

interface ITooltipParams {
    datum: IDatum;
    event: IMouseEvent;
    fillColor: IColor;
}

/**
 * Handles the user interacting with a DataPoint on the Scatter chart and the need to display a tooltip
 * @param  dispatch     The redux store dispatch function
 * @param  x            The key for the x value
 * @param  y            The key for the y value
 * @return              A function to set the tooltip datum
 */
export function useTooltip(dispatch: IDispatch, x: string, y: string) {
    const [datum, setDatum] = useState(null);
    const [color, setColor] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
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
        dispatch(eventActions.setPositionEvent(positionEvent?.offsetX, positionEvent?.offsetY));

        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItemX));
            dispatch(eventActions.removeTooltipItem(tooltipItemY));
        };
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
