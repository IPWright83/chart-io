import type { IColor, INumericValue, IValue } from "@chart-io/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";

export interface IHorizontalLineProps {
    /**
     * The y value to position the constant line at
     */
    value: IValue;
    /**
     * The key to use to determine which scale to use
     */
    y: string;
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
 * Renders a HorizontalLine
 * @return The HorizontalLine component
 */
export function HorizontalLine({ y, value, opacity = 1, stroke }: IHorizontalLineProps) {
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const right = useSelector((s: IState) => chartSelectors.dimensions.plot.right(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, "plot"));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    const yValue = scale(value as INumericValue);
    console.log(scale, left, right, yValue);

    return (
        <line
            x1={left}
            x2={right}
            y1={yValue}
            y2={yValue}
            style={{
                stroke: stroke?.toString(),
                opacity,
                pointerEvents: "none" as const,
            }}
        />
    );
}
