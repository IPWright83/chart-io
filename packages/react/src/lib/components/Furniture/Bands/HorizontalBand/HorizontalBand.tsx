import type { IValue, IColor } from "@d3-chart/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";

export interface IHorizontalBandProps {
    /**
     * The start y position of the rect given in the scale co-ordinates
     */
    yStart: IValue;
    /**
     * The end y position of the rect given in the scale co-ordinates
     */
    yStop: IValue;
    /**
     * The key to use to determine which scale to use
     */
    y: string;
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
 * Renders a HorizontalBand
 * @return The HorizontalBand component
 */
export function HorizontalBand({ yStart, yStop, y, opacity = 0.5, fill, stroke }: IHorizontalBandProps) {
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    // Calculate the position based on the scale. If no start was given
    // use the start of the scale "range" which are the pixel co-ordinates
    // for the start of the Y axis
    // @ts-ignore: Not sure how to fix this one
    const startY = yStart ? scale(yStart) : scale.range()[0];

    // Calculate the position based on the scale. If no stop was given
    // use the end of the scale "range" which are the pixel co-ordinates
    // for the end of the Y axis
    // @ts-ignore: Not sure how to fix this one
    const stopY = yStop ? scale(yStop) : scale.range()[1];

    return (
        <rect
            x={margin.left}
            width={width - margin.left - margin.right}
            y={stopY}
            height={startY - stopY}
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
