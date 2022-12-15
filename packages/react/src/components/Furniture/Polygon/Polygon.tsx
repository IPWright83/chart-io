import React from "react";
import PropTypes from "prop-types";

import { IColor } from "../../../types";

import "./Polygon.css";

export interface IPolygonProps {
    /**
     * The set of points to display. See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
     */
    points: string;
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
 * Renders a Polygon
 * @return {ReactElement}  The Polygon component
 */
const Polygon = ({ points, opacity = 0.5, fill, stroke }) => {
    if (!points) {
        return null;
    }

    return <polygon className="polygon" style={{ stroke, opacity, fill }} points={points} />;
};

export { Polygon };
