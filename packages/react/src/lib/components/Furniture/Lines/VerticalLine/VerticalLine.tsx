import { chartSelectors, IState } from "@chart-io/core";
import type { IColor, INumericValue, IValue } from "@chart-io/types";

import React from "react";
import { useSelector } from "react-redux";

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
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const bottom = useSelector((s: IState) => chartSelectors.dimensions.plot.bottom(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, "plot"));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    const xValue = scale(value as INumericValue);

    return (
        <line
            y1={top}
            y2={bottom}
            x1={xValue}
            x2={xValue}
            style={{
                stroke: stroke?.toString(),
                opacity,
                pointerEvents: "none" as const,
            }}
        />
    );
}
