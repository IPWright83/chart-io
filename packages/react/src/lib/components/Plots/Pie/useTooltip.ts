import { eventActions } from "@chart-io/core";
import type { IColor, IDatum, IDispatch, IMouseEvent, IValue } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

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

interface ITooltipParams {
    datum: IDatum;
    event: IMouseEvent;
    name: string;
    value: IValue;
    color: IColor;
}

/**
 * Helper function to manage tooltips for a selected slice on a Pie/Donut plot
 * @return              A function to clear up the tooltip
 */
function tooltip({ dispatch, datum, name, value, color, event }: IPieTooltipProps) {
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

/**
 * Handles the user interacting with a slice on a Pie/Donut/StackedDonut plot and the need to display a tooltip
 * @return              A function to set the tooltip parameters
 */
const useTooltip = () => {
    const { dispatch } = useStore();
    const [datum, setDatum] = useState(null);
    const [name, setName] = useState(null);
    const [value, setValue] = useState(null);
    const [color, setColor] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        return tooltip({ dispatch, datum, name, value, color, event: positionEvent });
    }, [dispatch, datum, name, value, color, positionEvent]);

    /**
     * A function to set the tooltip parameters
     * @param  tooltipParams    The configuration for the tooltip
     */
    return (tooltipParams: ITooltipParams) => {
        if (!tooltipParams) {
            setDatum(undefined);
            setName(undefined);
            setValue(undefined);
            setColor(undefined);
            setPositionEvent(undefined);
            return;
        }

        const { datum, event, name, value, color } = tooltipParams;

        setDatum(datum);
        setName(name);
        setValue(value);
        setColor(color);
        setPositionEvent(event);
    };
};

export { useTooltip };
