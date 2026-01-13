import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { chartActions, chartSelectors } from "../../store";
import { calculateScale } from "./calculateScale";

/**
 * Represents a Scale component
 * @return {ReactDOMComponent}   A scale component
 */
const Scale = ({ fields, range, scaleType, aggregate, domain, fromAxis }) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));

    useEffect(() => {
        if (!range) return;
        if (isNaN(range[0]) || isNaN(range[1])) return;

        // Use the fixed range if one was provided
        const scale = calculateScale(data, fields, range, domain, aggregate, scaleType);
        dispatch(chartActions.setScales(fields, scale, fromAxis));
    }, [fields, data, range, scaleType, aggregate, dispatch]);

    return <React.Fragment />;
};

Scale.propTypes = {
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
        PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    ),
};

Scale.defaultProps = {
    aggregate: false,
};

export { Scale };
