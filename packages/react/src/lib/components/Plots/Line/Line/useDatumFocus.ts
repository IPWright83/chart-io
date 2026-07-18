import { d3, eventActions, eventSelectors, getDistance, isNullOrUndefined, IState } from "@chart-io/core";
import type { IColor, ICoordinate, IData, IDispatch, IMouseEventType, IScale } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface IDatumFocusProps {
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
    layer: Element;
}

/**
 * Helper function to manage markers & droplines for a selected datum on the Line plot
 * @return              A function to set the focused datum
 */
function focus({ dispatch, x, y, color, xScale, position, yScale, data, layer, eventMode }: IFocusParams) {
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

    // Get the appropriate attributes
    const cx = xScale(datum[x] as number);
    const cy = yScale(datum[y] as number);
    const distance = getDistance(position.x, position.y, cx, cy);
    const fill = color;

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
export function useDatumFocus({ interactive, layer, x, y, xScale, yScale, data, color }: IDatumFocusProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
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
                layer: layer.current,
            });
        }
    }, [xScale, yScale, x, y, position.x, position.y, interactive, color, data, dispatch, eventMode, layer]);
}
