import React from "react";

import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../store";

/**
 * This component renders a Rectangular ClipPath that can be used to prevent overspill on the chart
 * @return The ClipPath component
 */
export function RectangleClipPath() {
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotClipPath = useSelector((s: IState) => chartSelectors.plotClipPath(s));

    return (
        <>
            <defs>
                <clipPath id={plotClipPath}>
                    <rect width={plotWidth} height={plotHeight} x={left} y={top} />
                </clipPath>
            </defs>
        </>
    );
}
