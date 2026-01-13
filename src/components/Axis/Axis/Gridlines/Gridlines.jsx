import "./gridlines.css";

import * as d3 from "d3";

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getTickSize } from "./getTickSize";
import { getD3Axis } from "../getD3Axis";

import { chartSelectors } from "../../../../store";

/**
 * Represents an Axis component
 * @return {ReactElement}  The Axis component
 */
const Gridlines = ({ layer, position, scale, tickPadding, ticks }) => {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const tickSize = getTickSize(position, width, height, margin);

    // Render the x-axis using D3
    useEffect(() => {
        if (layer.current && scale) {
            console.log(layer.current, scale);
            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position);

            // Set some scale props
            d3Axis.scale(scale).tickPadding(tickPadding).tickSize();

            d3.select(layer.current)
                .attr("class", `g-gridlines ${position}`)
                .transition()
                .duration(animationDuration)
                .call(d3Axis.tickSize(-tickSize).ticks(ticks).tickFormat(""));
        }
    }, [position, scale, animationDuration, tickPadding]);

    return null;
};

Gridlines.propTypes = {
    /**
     * The position of the axis [top, bottom, left, right]
     * @type {String}
     */
    position: PropTypes.oneOf(["top", "bottom", "left", "right"]),

    /**
     * The D3 scale object used for the axis
     * @type {Function}
     */
    scale: PropTypes.func,

    /**
     * https://github.com/d3/d3-axis#axis_tickPadding
     * @type {Number}
     */
    tickPadding: PropTypes.number,
    /**
     * https://github.com/d3/d3-axis#axis_ticks
     * @type {Number}
     */
    ticks: PropTypes.number,
};

Gridlines.defaultProps = {
    tickPadding: 3,
};

export { Gridlines };
