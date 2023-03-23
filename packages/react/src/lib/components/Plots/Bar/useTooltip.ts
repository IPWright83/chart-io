import { IColor, IDatum, IMouseEvent } from "@d3-chart/types";
import { useEffect, useState } from "react";

import { eventActions, IDispatch } from "../../../store";

interface ITooltipParams {
    datum: IDatum;
    event: IMouseEvent;
    fillColors: IColor[];
    xs: string[];
}

/**
 * Handles the user interacting with a DataPoint on the Column chart and the need to display a tooltip
 * @param  dispatch     The redux store dispatch function
 * @param  y            The key for the y value
 * @return              A function to set the tooltip datum
 */
const useTooltip = (dispatch: IDispatch, y: string) => {
    const [datum, setDatum] = useState(null);
    const [colors, setColors] = useState(null);
    const [xs, setXs] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
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

        dispatch(eventActions.setPositionEvent(positionEvent.offsetX, positionEvent.offsetY));

        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItemX));

            xTooltipItems.forEach((x) => {
                dispatch(eventActions.removeTooltipItem(x));
            });
        };
    }, [dispatch, colors, xs, y, datum, positionEvent]);

    /**
     * A function to set the tooltip parameters
     * @param  tooltipParams    The configuration for the tooltip
     */
    return (tooltipParams: ITooltipParams) => {
        if (!tooltipParams) {
            setDatum(undefined);
            setColors(undefined);
            setPositionEvent(undefined);
            setXs(undefined);
            return;
        }

        const { datum, event, fillColors, xs } = tooltipParams;

        setColors(fillColors);
        setPositionEvent(event);
        setXs(xs);
        setDatum(datum);
    };
};

export { useTooltip };
