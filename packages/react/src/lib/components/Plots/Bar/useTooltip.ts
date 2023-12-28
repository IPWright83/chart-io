import { IColor, IDatum, IMouseEvent } from "@chart-io/types";
import { bar } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

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
const useTooltip = ({ y }: Omit<bar.IBarTooltipProps, "dispatch" | "datum" | "colors" | "event" | "xs">) => {
    const { dispatch } = useStore();
    const [datum, setDatum] = useState(null);
    const [colors, setColors] = useState(null);
    const [xs, setXs] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        return bar.tooltip({ dispatch, datum, colors, event: positionEvent, xs, y });
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
