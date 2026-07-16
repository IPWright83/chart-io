import { d3, eventActions, eventSelectors, getDistance, isNullOrUndefined, IState } from "@chart-io/core";
import type { IColor, ICoordinate, IData, IDispatch, IMouseEventType, IScale } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface ITooltipProps {
    /**
     * The layer we're updating to from a React useRef
     */
    layer: React.MutableRefObject<Element>;
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
     * The color of the plot
     */
    color: IColor;
}

interface ITooltipParams {
    dispatch: IDispatch;
    x: string;
    y: string;
    color: IColor;
    xScale: IScale | undefined;
    yScale: IScale | undefined;
    position: ICoordinate;
    data: IData;
    layer: Element;
    eventMode: IMouseEventType;
}

/**
 * Helper function to manage tooltips for a selected datum on the Line plot
 * @return              A function to set the focused datum
 */
function tooltip({ dispatch, x, y, color, xScale, position, yScale, data, layer, eventMode }: ITooltipParams) {
    if (!layer || !xScale || !yScale || !data) {
        // istanbul ignore next
        return;
    }

    // We need the invert function to be able to do this
    // @ts-expect-error: We're handling a runtime validation so this is fine
    if (!xScale.invert) {
        // istanbul ignore next
        return;
    }

    // Don't run for the EXIT event
    if (eventMode === "NONE") {
        d3.select(layer).selectAll("circle").remove();
        return;
    }

    // Work out the datum that we're closet to
    // @ts-expect-error: We've already aserted that invert exists
    const xValue = xScale.invert(position.x);
    const index = d3.bisector((d) => d[x]).center(data, xValue);
    const datum = data[index];

    if (isNullOrUndefined(datum[y])) {
        // istanbul ignore next
        return;
    }

    const cx = xScale(datum[x] as number);
    const cy = yScale(datum[y] as number);
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
export function useTooltip({ layer, interactive, x, y, xScale, yScale, data, color }: ITooltipProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (interactive) {
            return tooltip({
                dispatch,
                x,
                y,
                color,
                xScale,
                yScale,
                position,
                data,
                layer: layer.current,
                eventMode,
            });
        }
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, y, data, layer, color]);
}
