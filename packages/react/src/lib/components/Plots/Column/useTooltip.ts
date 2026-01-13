import { IColor, IDatum, IMouseEvent } from "@d3-chart/types";
import { useEffect, useState } from "react";

import { eventActions, IDispatch } from "../../../store";

interface ITooltipParams {
    datum: IDatum;
    event: IMouseEvent;
    fillColors: IColor[];
    ys: string[];
}

/**
 * Handles the user interacting with a DataPoint on the Column chart and the need to display a tooltip
 * @param  dispatch        The redux store dispatch function
 * @param  x               The key for the x value
 * @return                 A function to set the tooltip datum
 */
const useTooltip = (dispatch: IDispatch, x: string) => {
    const [datum, setDatum] = useState(null);
    const [colors, setColors] = useState(null);
    const [ys, setYs] = useState(null);
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

        dispatch(eventActions.setPositionEvent(positionEvent.offsetX, positionEvent.offsetY));

        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItemX));

            yTooltipItems.forEach((y) => {
                dispatch(eventActions.removeTooltipItem(y));
            });
        };
    }, [dispatch, colors, x, ys, datum, positionEvent]);

    /**
     * A function to set the tooltip parameters
     * @param  tooltipParams    The configuration for the tooltip
     */
    return (tooltipParams: ITooltipParams) => {
        if (!tooltipParams) {
            setDatum(undefined);
            setColors(undefined);
            setPositionEvent(undefined);
            setYs(undefined);
            return;
        }

        const { datum, event, fillColors, ys } = tooltipParams;

        setColors(fillColors);
        setPositionEvent(event);
        setYs(ys);
        setDatum(datum);
    };
};

export { useTooltip };
