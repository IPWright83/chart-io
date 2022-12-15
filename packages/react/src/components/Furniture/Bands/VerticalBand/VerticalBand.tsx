import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors, IStore } from "../../../../store";
import type { IPrimitive, IColor } from "../../../../types";

import "./VerticalBand.css";

export interface IVerticalBandProps {
    /**
     * The start x position of the rect given in the scale co-ordinates
     */
    xStart: IPrimitive;
    /**
     * The end x position of the rect given in the scale co-ordinates
     */
    xStop: IPrimitive;
    /**
     * The key to use to determine which scale to use
     */
    x: string;
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
 * Renders a VerticalBand
 * @return {ReactElement}  The VerticalBand component
 */
const VerticalBand = ({ xStart, xStop, x, opacity = 0.5, fill, stroke }: IVerticalBandProps) => {
    const margin = useSelector((s: IStore) => chartSelectors.dimensions.margin(s));
    const height = useSelector((s: IStore) => chartSelectors.dimensions.height(s));
    const scale = useSelector((s: IStore) => chartSelectors.scales.getScale(s, x));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    // Calculate the position based on the scale. If no start was given
    // use the start of the scale "range" which are the pixel co-ordinates
    // for the start of the Y axis
    const startX = xStart ? scale(xStart) : scale.range()[0];

    // Calculate the position based on the scale. If no stop was given
    // use the end of the scale "range" which are the pixel co-ordinates
    // for the end of the Y axis
    const stopX = xStop ? scale(xStop) : scale.range()[1];

    return (
        <rect
            y={margin.top}
            height={height - margin.bottom - margin.top}
            width={stopX - startX}
            x={startX}
            className="rect"
            style={{ stroke, opacity, fill }}
        />
    );
};

export { VerticalBand };
