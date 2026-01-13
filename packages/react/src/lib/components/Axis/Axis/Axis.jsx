import * as d3 from "d3";

import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { getD3Axis } from "./getD3Axis";
import { getTransform } from "./getTransform";
import { Gridlines } from "./Gridlines";
import { Title } from "./Title";

import { chartSelectors } from "../../../store";

/**
 * Represents an Axis component
 * @return {ReactElement}  The Axis component
 */
const Axis = ({
    position,
    fields,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    ticks,
    showGridlines,
    title,
    tickFormat,
    tickValues,
}) => {
    if (fields.length === 0) {
        throw new Error(
            "Unable to render an Axis without a field. Ensure that you have provided at least one field in the 'fields' prop."
        );
    }

    const field = fields[0];
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const scale = useSelector((s) => chartSelectors.scales.getAxisScale(s, field));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));
    const transform = getTransform(position, width, height, margin);

    // React will own the axis containers, but D3 will own the axis themselves
    const axis = useRef(null);

    // Render the x-axis using D3
    useEffect(() => {
        if (axis.current && scale) {
            const selection = d3
                .select(axis.current)
                .style("color", theme.axis.stroke)
                .style("stroke-opacity", theme.axis.strokeOpacity)
                .style("stroke-width", theme.axis.strokeWidth)
                .transition()
                .duration(animationDuration);

            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position, scale);

            // Set some scale props
            d3Axis
                .scale(scale)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(tickSizeOuter)
                .tickPadding(tickPadding)
                .tickFormat(tickFormat)
                .tickValues(tickValues)
                .ticks(ticks);

            // Render the axis
            selection.call(d3Axis);
        }
    }, [position, axis, scale, animationDuration, tickPadding, tickSizeInner, tickSizeOuter, showGridlines]);

    return (
        <React.Fragment>
            <Title position={position} title={title} className={`axis-title-${position}`} />
            <g transform={transform}>
                {showGridlines ? (
                    <Gridlines position={position} scale={scale} ticks={ticks} tickValues={tickValues} />
                ) : null}
                <g className={`chart-it axis axis-${position}`} ref={axis} style={{ userSelect: "none" }} />
            </g>
        </React.Fragment>
    );
};

Axis.propTypes = {
    /**
     * The position of the axis [top, bottom, left, right]
     * @type {String}
     */
    position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    /**
     * The keys of the fields that will share this scale
     * @type {String[]}
     */
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * https://github.com/d3/d3-axis#axis_tickSizeInner
     * @type {Number}
     */
    tickSizeInner: PropTypes.number,
    /**
     * https://github.com/d3/d3-axis#axis_tickSizeOuter
     * @type {Number}
     */
    tickSizeOuter: PropTypes.number,
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
    /**
     * https://github.com/d3/d3-axis#axis_tickFormat
     * @type {Function}
     */
    tickFormat: PropTypes.func,
    /**
     * https://github.com/d3/d3-axis#axis_tickValues
     * @type {Array}
     */
    tickValues: PropTypes.array,
    /**
     * Should gridlines be drawn?
     * @type {Boolean}
     */
    showGridlines: PropTypes.bool,
    /**
     * A title for the Axis
     * @type {String}
     */
    title: PropTypes.string,
};

Axis.defaultProps = {
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    showGridlines: true,
};

export { Axis };
