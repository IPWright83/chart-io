import type { IPosition } from "@d3-chart/types";
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
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));

    const transform = getTransform(position, width, height, margin);

    if (!title) {
        return null;
    }

    const style = {
        textAnchor: "middle" as const,
        fontSize: 14,
        userSelect: "none" as const,
    };

    return (
        <text className={`d3-chart axis-title axis-title-${position}`} transform={transform} style={style}>
            {title}
        </text>
    );
}
