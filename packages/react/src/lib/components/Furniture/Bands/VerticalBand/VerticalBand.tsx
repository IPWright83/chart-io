import type { IColor, IValue } from "@chart-it/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";

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
    const plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plotMargin(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, "plot"));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    // Calculate the position based on the scale. If no start was given
    // use the start of the scale "range" which are the pixel co-ordinates
    // for the start of the Y axis
    // @ts-ignore: Not sure how to fix this one
    const startX = xStart ? scale(xStart) : scale.range()[0];

    // Calculate the position based on the scale. If no stop was given
    // use the end of the scale "range" which are the pixel co-ordinates
    // for the end of the Y axis
    // @ts-ignore: Not sure how to fix this one
    const stopX = xStop ? scale(xStop) : scale.range()[1];

    return (
        <rect
            y={plotMargin.top}
            height={height - plotMargin.bottom - plotMargin.top}
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
