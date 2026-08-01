import { eventActions } from "@chart-io/core";
import type { IColor, IDatum, IMouseEvent, IValue } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

interface ITooltipParams {
    datum: IDatum;
    event: IMouseEvent;
    name: string;
    value: IValue;
    color: IColor;
}

/**
 * Handles the user interacting with a slice on a Pie/Donut/StackedDonut plot and the need to display a tooltip
 * @return              A function to set the tooltip parameters
 */
const useTooltip = () => {
    const { dispatch } = useStore();
    const [datum, setDatum] = useState<IDatum>(null);
    const [name, setName] = useState<string>(null);
    const [value, setValue] = useState<IValue>(null);
    const [color, setColor] = useState<IColor>(null);
    const [positionEvent, setPositionEvent] = useState<IMouseEvent>(null);

    useEffect(() => {
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
        dispatch(eventActions.setPositionEvent({ x: positionEvent.offsetX, y: positionEvent.offsetY }));

        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItem));
        };
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
