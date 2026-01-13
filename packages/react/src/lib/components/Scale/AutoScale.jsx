import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useStore, useSelector } from "react-redux";

import { chartSelectors } from "../../store";
import { calculateScale } from "./calculateScale";
import { Scale } from "./Scale";

/**
 * Represents a Scale that is automatically generated
 * @return {ReactDOMComponent}   A scale component
 */
const AutoScale = ({ fields, range, scaleType, aggregate, domain, fromAxis }) => {
    const store = useStore();
    const data = useSelector((s) => chartSelectors.data(s));

    const scale = useMemo(() => {
        if (!range) return;
        if (isNaN(range[0]) || isNaN(range[1])) return;

        // Use the fixed range if one was provided
        return calculateScale(data, fields, range, domain, aggregate, scaleType);
    }, [fields, data, range, scaleType, aggregate, store.dispatch]);

    return <Scale fields={fields} scale={scale} fromAxis={fromAxis} />;
};

AutoScale.propTypes = {
    /**
     * The keys of the fields that will share this scale
     * @type {String[]}
     */
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * (Internal) Has this scale been created automatically from an Axis?
     * @type {Boolean}
     */
    fromAxis: PropTypes.bool,
    /**
     * Force the range of the scale, this is required if you haven't provided a type
     * @type {number[]}
     */
    range: PropTypes.arrayOf(PropTypes.number).isRequired,
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

AutoScale.defaultProps = {
    aggregate: false,
    fromAxis: false,
};

export { AutoScale };
