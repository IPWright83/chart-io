import React from "react";
import PropTypes from "prop-types";

import { Scale } from "./Scale";

/**
 * Represents an XScale
 * @param  {Object} props   Props for the scale
 * @return {ReactDOMComponent}   A scale component
 */
const ZScale = ({ fields, scaleType, range, domain, fromAxis }) => {
    return <Scale fields={fields} fromAxis={fromAxis} range={range} domain={domain} scaleType={scaleType} />;
};

ZScale.propTypes = {
    /**
     * The keys of the fields that will share this scale
     * @type {String[]}
     */
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * Has this scale been created automatically from an Axis?
     * @type {Boolean}
     */
    fromAxis: PropTypes.bool,
    /**
     *
     * Force the range of the scale, this is required if you haven't provided a type
     * @type {Array<number>}
     */
    range: PropTypes.array,
    /**
     * (Optional) Force the type of d3 scale to use - https://github.com/d3/d3-scale
     * @type {String}
     */
    scaleType: PropTypes.oneOf(["linear", "time", "power", "log", "band", "point"]),
    /**
     * (Optional) An override of the domain to use with the d3 scale
     * @type {Array}
     */
    domain: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    ),
};

ZScale.defaultProps = {
    range: [5, 25],
};

export { ZScale };
