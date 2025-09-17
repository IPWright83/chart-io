import { IColor, ICoordinate, IData, IInvertScale, IMouseEventType, INumericValue, IScale } from "@chart-io/types";
import { d3 } from "../../d3";

import type { IDispatch } from "../../store";
import { eventActions } from "../../store";
import { getDistance } from "../../utils";

export interface IStackedAreaFocusProps {
    /**
     * The color of the plot
     */
    colors: IColor[];
    /**
     * The complete dataset for the plot
     */
    data: IData;
    /**
     * The redux store dispatch function
     */
    dispatch: IDispatch;
    /**
     * The event mode from the selector one of ["NONE", "ENTER", "MOVE"]
     */
    eventMode: IMouseEventType;
    /**
     * The { x, y } position of the mouse
     */
    position: ICoordinate;
    /**
     * The key of the field used for the x position
     */
    x: string;
    /**
     * The keys of the fields used for the y positions
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
}

const defaultValues = {
    markers: [],
    horizontalDroplines: [],
    verticalDroplines: [],
    sum: 0,
};

/**
 * Helper function to manage markers & droplines for a selected datum on the Area plot
 * @return              A function to set the focused datum
 */
export function stackedFocus({
    dispatch,
    x,
    ys,
    xScale,
    yScale,
    position,
    data,
    colors,
    eventMode,
}: IStackedAreaFocusProps) {
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

    // Get the appropriate attributes
    const cx = xScale(datum[x] as INumericValue);

    const { markers, horizontalDroplines, verticalDroplines } = ys.reduce((result, y, i) => {
        // @ts-ignore TODO: Not sure how to fix this
        const sum = result.sum + datum[y];
        const cy = yScale(sum);
        const color = d3.color(colors[i].toString()).darker();

        const distance = getDistance(position.x, position.y, cx, cy);

        const marker = { fill: color, r1: 5, r2: 5, cx, cy, distance };
        const horizontalDropline = {
            isHorizontal: true,
            color,
            x1: cx,
            x2: xScale.range()[0],
            y1: cy,
            y2: cy,
            distance,
        };
        const verticalDropline = {
            isVertical: true,
            color,
            x1: cx,
            x2: cx,
            y1: cy,
            y2: yScale.range()[0],
            distance,
        };
        return {
            sum,
            markers: [...result.markers, marker],
            horizontalDroplines: [...result.horizontalDroplines, horizontalDropline],
            verticalDroplines: [...result.verticalDroplines, verticalDropline],
        };
    }, defaultValues);

    markers.forEach((marker) => dispatch(eventActions.addMarker(marker)));
    horizontalDroplines.forEach((horizontalDropline) => dispatch(eventActions.addDropline(horizontalDropline)));
    verticalDroplines.forEach((verticalDropline) => dispatch(eventActions.addDropline(verticalDropline)));

    // Clean up operations on exit
    // prettier-ignore
    return () => {
        markers.forEach((marker) => dispatch(eventActions.removeMarker(marker)));
        horizontalDroplines.forEach((horizontalDropline) => dispatch(eventActions.removeDropline(horizontalDropline)));
        verticalDroplines.forEach((verticalDropline) => dispatch(eventActions.removeDropline(verticalDropline)));
    };
}
