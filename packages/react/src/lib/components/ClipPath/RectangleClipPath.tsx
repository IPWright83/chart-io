import React from "react";

import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../store";
import { getChildrenWithProps } from "./getChildrenWithProps";

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
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const chartID = useSelector((s: IState) => chartSelectors.id(s));

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const childrenWithProps = getChildrenWithProps(children, `clip-path-${chartID}`);

    return (
        <>
            <defs>
                <clipPath id={`clip-path-${chartID}`}>
                    <rect width={plotWidth} height={plotHeight} x={margin.left} y={margin.top} />
                </clipPath>
            </defs>
            {childrenWithProps}
        </>
    );
}