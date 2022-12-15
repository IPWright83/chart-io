import "./Title.css";

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getTransform } from "./getTransform";

import { chartSelectors, IStore } from "../../../../store";
import type { IPosition } from "../../../../types";

export interface ITitleProps {
    /**
     * The position of the axis [top, bottom, left, right]
     */
    position: IPosition;
    /**
     * A title for the Axis
     */
    title: string;
}

export function Title({ position, title }: ITitleProps) {
    const width = useSelector((s: IStore) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IStore) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IStore) => chartSelectors.dimensions.margin(s));

    const transform = getTransform(position, width, height, margin);

    if (!title) {
        return null;
    }

    return (
        <text className={`chart-it axis-title axis-title-${position}`} transform={transform}>
            {title}
        </text>
    );
}
