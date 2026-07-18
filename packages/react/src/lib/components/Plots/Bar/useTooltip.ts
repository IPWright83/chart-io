import { eventActions } from "@chart-io/core";
import type { IColor, IDatum, IDispatch, IMouseEvent } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

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

interface ITooltipParams {
    datum: IDatum;
    event: IMouseEvent;
    fillColors: IColor[];
    xs: string[];
}

/**
 * Helper function to manage tooltips for a selected datum on the Bar plot
 * @return              A function to set the focused datum
 */
function tooltip({ dispatch, xs, y, datum, colors, event }: IBarTooltipProps) {
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

/**
 * Handles the user interacting with a DataPoint on the Column chart and the need to display a tooltip
 * @param  dispatch     The redux store dispatch function
 * @param  y            The key for the y value
 * @return              A function to set the tooltip datum
 */
const useTooltip = ({ y }: Omit<IBarTooltipProps, "dispatch" | "datum" | "colors" | "event" | "xs">) => {
    const { dispatch } = useStore();
    const [datum, setDatum] = useState(null);
    const [colors, setColors] = useState(null);
    const [xs, setXs] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        return tooltip({ dispatch, datum, colors, event: positionEvent, xs, y });
    }, [dispatch, colors, xs, y, positionEvent]);

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
