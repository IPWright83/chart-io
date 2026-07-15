import { IColor, IDatum, IMouseEvent, IValue } from "@chart-io/core";
import { pie } from "@chart-io/core";

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
    const [datum, setDatum] = useState(null);
    const [name, setName] = useState(null);
    const [value, setValue] = useState(null);
    const [color, setColor] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        return pie.tooltip({ dispatch, datum, name, value, color, event: positionEvent });
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
