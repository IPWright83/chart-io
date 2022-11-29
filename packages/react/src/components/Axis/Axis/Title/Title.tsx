import "./Title.css";

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getTransform } from "./getTransform";

import { chartSelectors } from "../../../../store";
import { Position } from "../../../../types";

export interface TitleProps {
    /**
     * The position of the axis [top, bottom, left, right]
     */
    position: Position;
    /**
     * A title for the Axis
     */
    title: string;
}

export function Title({ position, title }: TitleProps) {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));

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
