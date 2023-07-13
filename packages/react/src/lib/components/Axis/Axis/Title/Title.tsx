import type { IPosition } from "@chart-io/types";
import React from "react";
import { useSelector } from "react-redux";

import { getTransform } from "./getTransform";

import { chartSelectors, IState } from "../../../../store";

export interface ITitleProps {
    /**
     * The position of the title [top, bottom, left, right]
     */
    position: IPosition;
    /**
     * A title for the Axis
     */
    title?: string;
}

export function Title({ position, title }: ITitleProps) {
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plot.margin(s));

    const transform = getTransform(position, plotWidth, plotHeight, plotMargin);

    if (!title) {
        return null;
    }

    const style = {
        textAnchor: "middle" as const,
        fontSize: 14,
        userSelect: "none" as const,
    };

    return (
        <text className={`chart-io axis-title axis-title-${position}`} transform={transform} style={style}>
            {title}
        </text>
    );
}
