import { IColor, IDatum, IMouseEvent } from "@chart-io/core";
import { column } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

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
const useTooltip = ({ x }: Omit<column.IColumnTooltipProps, "dispatch" | "datum" | "colors" | "event" | "ys">) => {
    const { dispatch } = useStore();
    const [datum, setDatum] = useState(null);
    const [colors, setColors] = useState(null);
    const [ys, setYs] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        return column.tooltip({ dispatch, datum, colors, event: positionEvent, x, ys });
    }, [dispatch, colors, x, ys, positionEvent]);

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
