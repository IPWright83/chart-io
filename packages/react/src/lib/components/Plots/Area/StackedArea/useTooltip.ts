import { d3, eventActions, eventSelectors, getDistance, IState } from "@chart-io/core";
import type {
    IColor,
    ICoordinate,
    IData,
    IDispatch,
    IInvertScale,
    IMouseEventType,
    INumericValue,
    IScale,
    ITooltipItem,
} from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface IDatumsTooltipProps {
    /**
     * Whether the plot is interactive
     */
    interactive: boolean;
    /**
     * The key of the field used for the x position
     */
    x: string;
    /**
     * The keys of the fields used for the y position
     */
    ys: string[];
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
     * The colors of the data point
     */
    colors: IColor[];
}

interface IStackedTooltipParams {
    dispatch: IDispatch;
    eventMode: IMouseEventType;
    position: ICoordinate;
    data: IData;
    colors: IColor[];
    x: string;
    ys: string[];
    xScale: IScale | undefined;
    yScale: IScale | undefined;
}

/**
 * Helper function to manage tooltips for a selected datum on the stacked Area plot
 * @return              A function to set the focused datum
 */
function tooltip({ dispatch, eventMode, colors, x, ys, data, xScale, yScale, position }: IStackedTooltipParams) {
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

    // Common x value
    const tooltipItemX = {
        datum,
        name: x,
        value: datum[x],
    };
    dispatch(eventActions.addTooltipItem(tooltipItemX));

    const cx = xScale(xValue);

    const yTooltipItems = ys.reduce<ITooltipItem[]>((result, y, index) => {
        // Need to account for the stacking when calculating the distance to the point
        const cy = result.reduce((sum, r) => sum + +r.value, 0) + +datum[y];

        const item = {
            datum,
            name: y,
            value: datum[y],
            icon: "square" as const,
            fill: colors[index],
            distance: getDistance(position.x, position.y, cx, yScale(cy as INumericValue)),
        };

        return [...result, item];
    }, []);

    yTooltipItems.forEach((y) => {
        dispatch(eventActions.addTooltipItem(y));
    });

    dispatch(eventActions.setPositionEvent(position));

    // Clean up operations on exit
    return () => {
        dispatch(eventActions.setTooltipBorderColor(undefined));
        dispatch(eventActions.removeTooltipItem(tooltipItemX));

        yTooltipItems.forEach((y) => {
            dispatch(eventActions.removeTooltipItem(y));
        });
    };
}

/**
 * Responds to events from an event layer to show Tooltips
 */
export function useTooltip({ x, ys, xScale, yScale, data, colors, interactive }: IDatumsTooltipProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (interactive) {
            return tooltip({ x, ys, xScale, yScale, data, colors, dispatch, eventMode, position });
        }
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, ys, data, colors]);
}
