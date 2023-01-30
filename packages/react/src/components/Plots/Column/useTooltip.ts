import { useState, useEffect } from "react";

import { eventActions } from "../../../store";

/**
 * Handles the user interacting with a DataPoint on the Column chart and the need to display a tooltip
 * @param  {Function} dispatch     The redux store dispatch function
 * @param  {String} x              The key for the x value
 * @return {Function}              A function to set the tooltip datum
 */
const useTooltip = (dispatch, x) => {
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
            seriesType: "column",
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
     * Represents the information required for a tooltip
     * @typedef {Object}  TooltipParams
     * @property {object} datum          The datum that triggered the tooltip event
     * @property {Array}  fillColors     The fill colors for each series
     * @property {Object} event          The MouseEvent that triggered the tooltip
     * @property {Array}  ys             The keys for the y value
     */

    /**
     * A function to set the tooltip parameters
     * @param  {TooltipParams} tooltipParams    The configuration for the tooltip
     */
    return (tooltipParams) => {
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
