import * as d3 from "d3";
import { useEffect } from "react";

import { eventActions, IDispatch } from "../../../../store";
import { isNullOrUndefined } from "../../../../utils";
import { IScaleFunction, IMouseMode, IData, ICoordinate, IColor } from "../../../../types";

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
const useTooltip = (
    dispatch: IDispatch,
    layer: React.MutableRefObject<JSX.Element>,
    x: string,
    y: string,
    xScale: IScaleFunction,
    yScale: IScaleFunction,
    data: IData,
    eventMode: IMouseMode,
    position: ICoordinate,
    color: IColor
) => {
    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (!layer.current || !xScale || !yScale || !data) {
            return;
        }

        // We need the invert function to be able to do this
        // @ts-ignore: Runtime check of the scale
        if (!xScale.invert) {
            return;
        }

        // Don't run for the EXIT event
        if (eventMode === "NONE") {
            d3.select(layer.current).selectAll("circle").remove();
            return;
        }

        // Work out the datum that we're closet to
        // @ts-ignore We've already confirmed .invert exists
        const xValue = xScale.invert(position.x);
        const index = d3.bisector((d) => d[x]).center(data, xValue);
        const datum = data[index];

        if (isNullOrUndefined(datum[y])) {
            return;
        }

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
            seriesType: "column" as const,
            fill: color,
        };
        dispatch(eventActions.addTooltipItem(tooltipItemY));
        dispatch(eventActions.setPositionEvent(position.x, position.y));

        // Clean up operations on exit
        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItemX));
            dispatch(eventActions.removeTooltipItem(tooltipItemY));
        };
    }, [eventMode, position.x, position.y, xScale, yScale, x, y, data, layer, color]);
};

export { useTooltip };
