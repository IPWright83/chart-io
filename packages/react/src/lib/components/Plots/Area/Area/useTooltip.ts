import { d3, eventActions, eventSelectors, getDistance, isNullOrUndefined, IState } from "@chart-io/core";
import type { IColor, ICoordinate, IData, IDispatch, IInvertScale, IMouseEventType, INumericValue, IScale } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface IDatumTooltipProps {
    /**
     * Whether the plot is interactive
     */
    interactive: boolean;
    /**
     * The key of the field used for the x position
     */
    x: string;
    /**
     * The key of the field used for the y position
     */
    y: string;
    /**
     * The d3 scale for the x axis
     */
    xScale: IScale | undefined;
    /**
     * The d3 scale for the y axis
     */
    yScale: IScale | undefined;
    /**
     * The complete dataset for the plot
     */
    data: IData;
    /**
     * The color of the data point
     */
    color: IColor;
}

interface ITooltipParams {
    dispatch: IDispatch;
    eventMode: IMouseEventType;
    position: ICoordinate;
    data: IData;
    color: IColor;
    x: string;
    y: string;
    xScale: IScale | undefined;
    yScale: IScale | undefined;
}

/**
 * Helper function to manage tooltips for a selected datum on the Area plot
 * @return              A function to set the focused datum
 */
function tooltip({ dispatch, eventMode, color, x, y, data, xScale, yScale, position }: ITooltipParams) {
    // We need the invert function to be able to do this
    if (!(xScale as IInvertScale).invert) {
        // istanbul ignore next
        return;
    }

    // Don't run for the EXIT event
    if (eventMode === "NONE") {
        return;
    }

    // Work out the datum that we're closet to
    const xValue = (xScale as IInvertScale).invert(position.x);
    const index = d3.bisector((d) => d[x]).center(data, xValue);
    const datum = data[index];

    if (isNullOrUndefined(datum[y])) {
        // istanbul ignore next
        return;
    }

    const cx = xScale(datum[x] as INumericValue);
    const cy = yScale(datum[y] as INumericValue);
    const distance = getDistance(position.x, position.y, cx, cy);

    // Common x value
    const tooltipItemX = {
        datum,
        name: x,
        value: datum[x],
    };
    dispatch(eventActions.addTooltipItem(tooltipItemX));

    const tooltipItemY = {
        datum,
        name: y,
        value: datum[y],
        icon: "square" as const,
        fill: color,
        distance,
    };
    dispatch(eventActions.addTooltipItem(tooltipItemY));
    dispatch(eventActions.setPositionEvent(position));

    // Clean up operations on exit
    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));
        dispatch(eventActions.removeTooltipItem(tooltipItemY));
    };
}

/**
 * Responds to events from an event layer to show Tooltips
 */
export function useTooltip({ x, y, xScale, yScale, data, color, interactive }: IDatumTooltipProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (interactive) {
            return tooltip({ x, y, xScale, yScale, data, color, dispatch, eventMode, position });
        }
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, y, data, color]);
}
