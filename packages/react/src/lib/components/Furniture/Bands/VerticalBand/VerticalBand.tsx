import { chartSelectors, IState } from "@chart-io/core";
import type { IColor, IValue } from "@chart-io/types";

import React from "react";
import { useSelector } from "react-redux";

export interface IVerticalBandProps {
    /**
     * The start x position of the rect given in the scale co-ordinates
     */
    xStart: IValue;
    /**
     * The end x position of the rect given in the scale co-ordinates
     */
    xStop: IValue;
    /**
     * The key to use to determine which scale to use
     */
    x: string;
    /**
     * The opactity to use for the Polygon
     */
    opacity?: number;
    /**
     * The fill color of the Polygon
     */
    fill?: IColor;
    /**
     * The stroke color of the Polygon
     */
    stroke?: IColor;
}

/**
 * Renders a VerticalBand
 * @return The VerticalBand component
 */
export function VerticalBand({ xStart, xStop, x, opacity = 0.5, fill, stroke }: IVerticalBandProps) {
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, "plot"));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    // Calculate the position based on the scale. If no start was given
    // use the start of the scale "range" which are the pixel co-ordinates
    // for the start of the Y axis
    // @ts-ignore: Not sure how to fix this one
    const startX = xStart ? scale(xStart) : scale.range()[0] as number;

    // Calculate the position based on the scale. If no stop was given
    // use the end of the scale "range" which are the pixel co-ordinates
    // for the end of the Y axis
    // @ts-ignore: Not sure how to fix this one
    const stopX = xStop ? scale(xStop) : scale.range()[scale.range().length - 1] as number;

    return (
        <rect
            y={top}
            height={plotHeight}
            width={stopX - startX}
            x={startX}
            className="rect"
            style={{
                stroke: stroke?.toString(),
                opacity,
                fill: fill?.toString(),
                pointerEvents: "none" as const,
            }}
        />
    );
}
