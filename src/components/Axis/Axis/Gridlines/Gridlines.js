import "./gridlines.css";

import * as d3 from "d3";

import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { getTickSize } from "./getTickSize";
import { getD3Axis } from "../getD3Axis";

import { chartSelectors } from "../../../../store";

/**
 * Represents an Axis component
 * @return {ReactElement}  The Axis component
 */
const Gridlines = ({ layer, position, scale, tickPadding }) => {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const tickSize = getTickSize(position, width, height, margin);

    // Render the x-axis using D3
    useEffect(() => {
        if (layer.current && scale) {
            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position);

            // Set some scale props
            d3Axis.scale(scale).tickPadding(tickPadding).tickSize();

            const selection = d3
                .select(layer.current)
                .attr("class", `g-gridlines ${position}`)
                .transition()
                .duration(animationDuration)
                .call(d3Axis.tickSize(-tickSize).tickFormat(""));
        }
    }, [theme.foreground, position, scale, animationDuration, tickPadding]);

    return null;
};

Gridlines.propTypes = {
    /** @type {String} The position of the axis [top, bottom, left, right] */
    position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    /** @type {Function} The D3 scale object used for the axis */
    scale: PropTypes.func,
    /** @type {Number} https://github.com/d3/d3-axis#axis_tickPadding */
    tickPadding: PropTypes.number,
};

Gridlines.defaultProps = {
    tickPadding: 3,
};

export { Gridlines };
