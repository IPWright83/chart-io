import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors, IStore } from "../../../../store";
import type { IPrimitive, IColor } from "../../../../types";

import "./HorizontalBand.css";

export interface IHorizontalBandProps {
    /**
     * The start y position of the rect given in the scale co-ordinates
     */
    yStart: IPrimitive;
    /**
     * The end y position of the rect given in the scale co-ordinates
     */
    yStop: IPrimitive;
    /**
     * The key to use to determine which scale to use
     */
    y: string;
    /**
     * The opactity to use for the Polygon
     */
    opacity?: number;
    /**
     * The fill color of the Polygon
     */
    fill?: IColor;
    /**
     * The stroke color of the Polygon
     */
    stroke?: IColor;
}

/**
 * Renders a HorizontalBand
 * @return {ReactElement}  The HorizontalBand component
 */
const HorizontalBand = ({ yStart, yStop, y, opacity = 0.5, fill, stroke }: IHorizontalBandProps) => {
    const margin = useSelector((s: IStore) => chartSelectors.dimensions.margin(s));
    const width = useSelector((s: IStore) => chartSelectors.dimensions.width(s));
    const scale = useSelector((s: IStore) => chartSelectors.scales.getScale(s, y));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    // Calculate the position based on the scale. If no start was given
    // use the start of the scale "range" which are the pixel co-ordinates
    // for the start of the Y axis
    const startY = yStart ? scale(yStart) : scale.range()[0];

    // Calculate the position based on the scale. If no stop was given
    // use the end of the scale "range" which are the pixel co-ordinates
    // for the end of the Y axis
    const stopY = yStop ? scale(yStop) : scale.range()[1];

    return (
        <rect
            x={margin.left}
            width={width - margin.left - margin.right}
            y={stopY}
            height={startY - stopY}
            className="rect"
            style={{ stroke, opacity, fill }}
        />
    );
};

export { HorizontalBand };
