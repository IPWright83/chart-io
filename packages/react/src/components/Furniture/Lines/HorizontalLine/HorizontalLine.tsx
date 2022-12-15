import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors, IStore } from "../../../../store";
import type { IPrimitive, IColor } from "../../../../types";

import "./HorizontalLine.css";

export interface IHorizontalLineProps {
    /**
     * The y value to position the constant line at
     */
    value: IPrimitive;
    /**
     * The key to use to determine which scale to use
     */
    y: string;
    /**
     * The opactity to use for the Polygon
     */
    opacity?: number;
    /**
     * The stroke color of the Polygon
     */
    stroke?: IColor;
}

/**
 * Renders a HorizontalLine
 * @return {ReactElement}  The HorizontalLine component
 */
const HorizontalLine = ({ y, value, opacity = 1, stroke }: IHorizontalLineProps) => {
    const margin = useSelector((s: IStore) => chartSelectors.dimensions.margin(s));
    const width = useSelector((s: IStore) => chartSelectors.dimensions.width(s));
    const scale = useSelector((s: IStore) => chartSelectors.scales.getScale(s, y));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    const yValue = scale(value);

    return <line x1={margin.left} x2={width - margin.right} y1={yValue} y2={yValue} style={{ stroke, opacity }} />;
};

export { HorizontalLine };
