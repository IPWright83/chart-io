import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors, IStore } from "../../../../store";
import type { IPrimitive, IColor } from "../../../../types";

import "./VerticalLine.css";

export interface IVerticalLineProps {
    /**
     * The x value to position the constant line at
     */
    value: IPrimitive;
    /**
     * The key to use to determine which scale to use
     */
    x: string;
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
 * Renders a VerticalLine
 * @return {ReactElement}  The VerticalLine component
 */
const VerticalLine = ({ x, value, opacity = 1, stroke }: IVerticalLineProps) => {
    const margin = useSelector((s: IStore) => chartSelectors.dimensions.margin(s));
    const height = useSelector((s: IStore) => chartSelectors.dimensions.height(s));
    const scale = useSelector((s: IStore) => chartSelectors.scales.getScale(s, x));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    const xValue = scale(value);

    return <line y1={margin.top} y2={height - margin.bottom} x1={xValue} x2={xValue} style={{ stroke, opacity }} />;
};

export { VerticalLine };
