import type { IScale, IData, IMouseEventType, ICoordinate, IColor } from "@d3-chart/types";
import * as d3 from "d3";
import { useEffect } from "react";

import { eventActions, IDispatch } from "../../../../store";

/**
 * Responds to events from an event layer to show Tooltips
 * @param  dispatch     The redux store dispatch function
 * @param  layer        The layer we're updating to from a React useRef
 * @param  x            The key of the field used for the x position
 * @param  y            The key of the field used for the y position
 * @param  xScale       The d3 scale for the x axis
 * @param  yScale       The d3 scale for the y axis
 * @param  data         The complete dataset for the plot
 * @param  eventMode    The event mode from the selector one of ["NONE", "ENTER", "MOVE"]
 * @param  position     The { x, y } position of the mouse
 * @param  color        The color of the plot
 */
export function useTooltip(
    dispatch: IDispatch,
    layer: React.MutableRefObject<Element>,
    x: string,
    ys: string[],
    xScale: IScale,
    yScale: IScale,
    data: IData,
    eventMode: IMouseEventType,
    position: ICoordinate,
    colors: IColor[]
) {
    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (!layer.current || !xScale || !yScale || !data) {
            // istanbul ignore next
            return;
        }

        // We need the invert function to be able to do this
        // @ts-expect-error: This is a runtime check
        if (!xScale.invert) {
            // istanbul ignore next
            return;
        }

        // Don't run for the EXIT event
        if (eventMode === "NONE") {
            d3.select(layer.current).selectAll("circle").remove();
            return;
        }

        // Work out the datum that we're closet to
        // @ts-expect-error: This has already been protected against
        const xValue = xScale.invert(position.x);
        const index = d3.bisector((d) => d[x]).center(data, xValue);
        const datum = data[index];

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

        dispatch(eventActions.setPositionEvent(position.x, position.y));

        // Clean up operations on exit
        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItemX));

            yTooltipItems.forEach((y) => {
                dispatch(eventActions.removeTooltipItem(y));
            });
        };
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, ys, data, layer, colors]);
}
