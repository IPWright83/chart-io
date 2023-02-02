import type { IValue, IColor } from "@d3-chart/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";

export interface IVerticalLineProps {
    /**
     * The x value to position the constant line at
     */
    value: IValue;
    /**
     * The key to use to determine which scale to use
     */
    x: string;
    /**
     * The opactity to use for the Polygon
     */
    opacity?: number;
    /**
     * The stroke color of the Polygon
     */
    stroke?: IColor;
}

/**
 * Renders a VerticalLine
 * @return The VerticalLine component
 */
export function VerticalLine({ x, value, opacity = 1, stroke }: IVerticalLineProps) {
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    // @ts-ignore: Not sure how to fix this one
    const xValue = scale(value);

    return (
        <line
            y1={margin.top}
            y2={height - margin.bottom}
            x1={xValue}
            x2={xValue}
            style={{ stroke, opacity, pointerEvents: "none" }}
        />
    );
}
