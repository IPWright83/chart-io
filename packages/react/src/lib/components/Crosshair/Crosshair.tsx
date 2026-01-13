import React from "react";

import { useSelector } from "react-redux";

import { chartSelectors, eventSelectors, IState } from "../../store";

export interface ICrosshairProps {
    /**
     * Should horizontal droplines be shown?
     * @default true
     */
    showHorizontal?: boolean;

    /**
     * Should vertical droplines be shown?
     * @default true
     */
    showVertical?: boolean;
}

/**
 * This component renders the droplines that are triggered from various plots
 * @return The Crosshair component
 */
export function Crosshair({ showVertical = true, showHorizontal = true }: ICrosshairProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    if (!position.x && !position.y) {
        return null;
    }

    const { x, y } = position;

    return (
        <>
            {showHorizontal && (
                <line
                    x1={margin.left}
                    x2={width - margin.right}
                    y1={y}
                    y2={y}
                    stroke={`${theme.crosshair.stroke}`}
                    strokeOpacity={theme.crosshair.strokeOpacity}
                    strokeWidth={theme.crosshair.strokeWidth}
                    strokeDasharray={theme.crosshair.strokeDasharray}
                    style={{ pointerEvents: "none" }}
                />
            )}
            {showVertical && (
                <line
                    x1={x}
                    x2={x}
                    y1={margin.top}
                    y2={height - margin.bottom}
                    stroke={`${theme.crosshair.stroke}`}
                    strokeOpacity={theme.crosshair.strokeOpacity}
                    strokeWidth={theme.crosshair.strokeWidth}
                    strokeDasharray={theme.crosshair.strokeDasharray}
                    style={{ pointerEvents: "none" }}
                />
            )}
        </>
    );
}
