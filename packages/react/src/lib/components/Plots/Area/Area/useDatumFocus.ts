import { d3, eventActions, eventSelectors, getDistance, isNullOrUndefined, IState } from "@chart-io/core";
import type { IColor, ICoordinate, IData, IDispatch, IInvertScale, IMouseEventType, INumericValue, IScale } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface IDatumFocusProps {
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

interface IFocusParams {
    dispatch: IDispatch;
    x: string;
    y: string;
    color: IColor;
    xScale: IScale | undefined;
    yScale: IScale | undefined;
    position: ICoordinate;
    data: IData;
    eventMode: IMouseEventType;
}

/**
 * Helper function to manage markers & droplines for a selected datum on the Area plot
 * @return              A function to set the focused datum
 */
function focus({ dispatch, x, y, xScale, yScale, position, data, color, eventMode }: IFocusParams) {
    if (!xScale || !yScale || !data) {
        // istanbul ignore next
        return;
    }

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

    // Get the appropriate attributes
    const cx = +xScale(datum[x] as INumericValue);
    const cy = +yScale(datum[y] as INumericValue);
    const fill = color;
    const distance = getDistance(position.x, position.y, cx, cy);

    const marker = { fill, cx, cy, distance };
    const horizontalDropline = {
        isHorizontal: true,
        color: fill,
        x1: cx,
        x2: xScale.range()[0] as number,
        y1: cy,
        y2: cy,
        distance,
    };

    const verticalDropline = {
        isVertical: true,
        color: fill,
        x1: cx,
        x2: cx,
        y1: cy,
        y2: yScale.range()[0] as number,
        distance,
    };

    dispatch(eventActions.addMarker(marker));
    dispatch(eventActions.addDropline(horizontalDropline));
    dispatch(eventActions.addDropline(verticalDropline));

    // Clean up operations on exit
    return () => {
        dispatch(eventActions.removeMarker(marker));
        dispatch(eventActions.removeDropline(horizontalDropline));
        dispatch(eventActions.removeDropline(verticalDropline));
    };
}

/**
 * Responds to events from an event layer to focus the nearest datum
 */
export function useDatumFocus({ interactive, x, y, xScale, yScale, data, color }: IDatumFocusProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        /* If possible respond to global mouse events for tooltips etc */
        if (interactive) {
            return focus({
                dispatch,
                x,
                y,
                color,
                xScale,
                yScale,
                position,
                data,
                eventMode,
            });
        }
    }, [eventMode, position.x, position.y, xScale, yScale, x, y, data, color]);
}
