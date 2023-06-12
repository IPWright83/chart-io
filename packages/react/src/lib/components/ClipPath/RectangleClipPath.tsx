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
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plotMargin(s));
    const chartID = useSelector((s: IState) => chartSelectors.id(s));

    // TODO move these into selectors?
    const plotWidth = Math.max(0, width - plotMargin.left - plotMargin.right);
    const plotHeight = Math.max(0, height - plotMargin.top - plotMargin.bottom);

    const childrenWithProps = extendChildrenProps(children, { clipPath: `clip-path-${chartID}` });

    return (
        <>
            <defs>
                <clipPath id={`clip-path-${chartID}`}>
                    <rect width={plotWidth} height={plotHeight} x={plotMargin.left} y={plotMargin.top} />
                </clipPath>
            </defs>
            {childrenWithProps}
        </>
    );
}
