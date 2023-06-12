import type { IColor, INumericValue, IValue } from "@chart-it/types";
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
    const plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plotMargin(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, "plot"));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    const yValue = scale(value as INumericValue);

    return (
        <line
            x1={plotMargin.left}
            x2={width - plotMargin.right}
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
