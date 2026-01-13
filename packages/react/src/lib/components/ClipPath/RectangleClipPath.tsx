import React from "react";

import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../store";
import { extendChildrenProps } from "../../utils";

export interface IRectangleClipPathProps {
    /**
     * The child components for the chart
     */
    children?: JSX.Element | JSX.Element[];
}

/**
 * This component renders a Rectangular ClipPath that can be used to prevent overspill on the chart
 * @return The ClipPath component
 */
export function RectangleClipPath({ children }: IRectangleClipPathProps) {
    const chartID = useSelector((s: IState) => chartSelectors.id(s));

    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));

    const childrenWithProps = extendChildrenProps(children, { clipPath: `clip-path-${chartID}` });

    return (
        <>
            <defs>
                <clipPath id={`clip-path-${chartID}`}>
                    <rect width={plotWidth} height={plotHeight} x={left} y={top} />
                </clipPath>
            </defs>
            {childrenWithProps}
        </>
    );
}
