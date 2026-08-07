import { d3, eventActions, eventSelectors, getDistance, isNullOrUndefined, IState } from "@chart-io/core";
import type { IColor, IData, IInvertScale, INumericValue, IScale } from "@chart-io/core";

import { useEffect } from "react";
import { useSelector, useStore } from "react-redux";

interface IRadialDatumFocusProps {
    /**
     * Whether the plot is interactive
     */
    interactive: boolean;
    /**
     * The key of the field used for the angular position
     */
    x: string;
    /**
     * The key of the field used for the radial position
     */
    y: string;
    /**
     * The d3 scale mapping `x` to an angle (in radians)
     */
    xScale: IScale | undefined;
    /**
     * The d3 scale mapping `y` to a radius (in pixels)
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
    /**
     * The x-coordinate of the center of the plot
     */
    cx: number;
    /**
     * The y-coordinate of the center of the plot
     */
    cy: number;
}

/**
 * Responds to global mouse events to focus & show a tooltip for the nearest datum on a
 * `<RadialArea>`. This is the polar equivalent of Area's own datum focus/tooltip hooks: instead of
 * inverting a pixel x-position directly through an x-scale, the mouse position is first converted
 * into an angle relative to the chart's center, which is then inverted through the angular scale
 */
export function useRadialDatumFocus({ interactive, x, y, xScale, yScale, data, color, cx, cy }: IRadialDatumFocusProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    useEffect(() => {
        if (!interactive || !xScale || !yScale || !data.length) {
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

        // Convert the mouse position into an angle (in radians) relative to the center, matching
        // the same convention used to place points: 0 is straight up, increasing clockwise
        const dx = position.x - cx;
        const dy = position.y - cy;
        const rawAngle = Math.atan2(dx, -dy);
        const angle = rawAngle < 0 ? rawAngle + 2 * Math.PI : rawAngle;

        // Work out the datum that we're closest to
        const xValue = (xScale as IInvertScale).invert(angle);
        const index = d3.bisector((d) => d[x]).center(data, xValue);
        const datum = data[index];

        if (!datum || isNullOrUndefined(datum[y])) {
            // istanbul ignore next
            return;
        }

        const angleOf = xScale as unknown as (value: unknown) => number;
        const radius = Math.max(0, +yScale(datum[y] as INumericValue));
        const markerX = cx + radius * Math.sin(angleOf(datum[x]));
        const markerY = cy - radius * Math.cos(angleOf(datum[x]));
        const distance = getDistance(position.x, position.y, markerX, markerY);

        const marker = { fill: color, cx: markerX, cy: markerY, distance };
        dispatch(eventActions.addMarker(marker));

        const tooltipItem = { datum, name: y, value: datum[y], icon: "square" as const, fill: color, distance };
        dispatch(eventActions.addTooltipItem(tooltipItem));
        dispatch(eventActions.setPositionEvent(position));

        // Clean up operations on exit
        return () => {
            dispatch(eventActions.removeMarker(marker));
            dispatch(eventActions.removeTooltipItem(tooltipItem));
        };
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, y, data, color, cx, cy]);
}
