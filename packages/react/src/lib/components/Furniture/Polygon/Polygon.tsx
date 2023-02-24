import type { IColor } from "@d3-chart/types";
import React from "react";

export interface IPolygonProps {
    /**
     * The set of points to display. See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
     */
    points: string;
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
 * Renders a Polygon
 * @return The Polygon component
 */
export function Polygon({ points, opacity = 0.5, fill, stroke }: IPolygonProps) {
    if (!points) {
        return null;
    }

    return (
        <polygon
            className="polygon"
            points={points}
            style={{
                stroke: stroke?.toString(),
                opacity,
                fill: fill?.toString(),
                pointerEvents: "none",
            }}
        />
    );
}
