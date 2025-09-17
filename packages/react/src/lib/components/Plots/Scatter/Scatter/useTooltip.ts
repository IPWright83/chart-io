import { scatter } from "@chart-io/core";
import { IColor, IDatum, IMouseEvent } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

interface ITooltipParams {
    datum: IDatum;
    event: IMouseEvent;
    fillColor: IColor;
}

/**
 * Handles the user interacting with a DataPoint on the Scatter chart and the need to display a tooltip
 * @param  x            The key for the x value
 * @param  y            The key for the y value
 * @return              A function to set the tooltip datum
 */
export function useTooltip({ x, y }: Omit<scatter.IScatterTooltipProps, "dispatch" | "color" | "event" | "datum">) {
    const { dispatch } = useStore();
    const [datum, setDatum] = useState(null);
    const [color, setColor] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        return scatter.tooltip({ dispatch, datum, color, event: positionEvent, x, y });
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
