import { chartSelectors, IState } from "@chart-io/core";
import type { ILegendFormatter } from "@chart-io/types";

import React from "react";
import { useSelector } from "react-redux";

import { getLegendMaxDimensions } from "./getLegendMaxDimensions";
import { getLegendPosition } from "./getLegendPosition";
import { Legend } from "./Legend";

export interface ILegendOverlayProps {
    /**
     * The horizontal position of the legend
     */
    horizontalPosition?: "LEFT" | "RIGHT" | "CENTER";
    /**
     * The vertical position of the legend
     */
    verticalPosition?: "TOP" | "BOTTOM" | "CENTER";
    /**
     * A set of custom formatters for the Legend
     */
    formatters?: Record<string, ILegendFormatter>;
}

export function LegendOverlay({
    verticalPosition = "CENTER",
    horizontalPosition = "RIGHT",
    formatters = {},
}: ILegendOverlayProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const items = useSelector((s: IState) => chartSelectors.legend.items(s));
    const showLegend = useSelector((s: IState) => chartSelectors.legend.isVisible(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    if (!showLegend) {
        return null;
    }

    const isHorizontal = verticalPosition == "TOP" || verticalPosition == "BOTTOM";
    const positionStyle = {
        ...getLegendPosition(horizontalPosition, verticalPosition),
        ...getLegendMaxDimensions(
            horizontalPosition,
            verticalPosition,
            width,
            height,
            theme.legend.defaultMaxWidth,
            theme.legend.defaultMaxHeight,
        ),
    };

    const style = {
        width: "100%",
        height: "100%",
        pointerEvents: "none" as const,
    };

    return (
        <foreignObject width={width} height={height} style={style}>
            <Legend items={items} horizontal={isHorizontal} positionStyle={positionStyle} formatters={formatters} />
        </foreignObject>
    );
}
