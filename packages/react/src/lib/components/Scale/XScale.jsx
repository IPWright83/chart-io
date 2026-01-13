import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../store";
import { AutoScale } from "./AutoScale";

/**
 * Represents an XScale
 * @param  {Object} props   Props for the scale
 * @return {ReactDOMComponent}   A scale component
 */
const XScale = ({ fields, scaleType, aggregate, domain, fromAxis }) => {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const range = [margin.left, width - margin.right];

    return (
        <AutoScale
            fields={fields}
            fromAxis={fromAxis}
            range={range}
            scaleType={scaleType}
            domain={domain}
            aggregate={aggregate}
        />
    );
};

XScale.propTypes = {
    /**
     * The keys of the fields used for the scale
     * @type {String[]}
     */
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * Has this scale been created automatically from an Axis?
     * @type {Boolean}
     */
    fromAxis: PropTypes.bool,
    /**
     * (Optional) Force the type of d3 scale to use - https://github.com/d3/d3-scale
     * @type {String}
     */
    scaleType: PropTypes.oneOf(["linear", "time", "power", "log", "band", "point"]),
    /**
     * Whether this scale is an aggregate (of multiple y values)
     * @type {Boolean}
     */
    aggregate: PropTypes.bool,
    /**
     * (Optional) An override of the domain to use with the d3 scale
     * @type {Array}
     */
    domain: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool])
    ),
};

XScale.defaultProps = {
    fromAxis: false,
};

export { XScale };
