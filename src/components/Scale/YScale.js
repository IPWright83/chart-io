import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../store";
import { Scale } from "./Scale";

/**
 * Represents a YScale
 * @param  {Object} props   Props for the scale
 * @return {ReactElement}   A scale component
 */
const YScale = ({ fields, scaleType, aggregate }) => {
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const range = [height - margin.bottom, margin.top];

    return <Scale fields={fields} range={range} scaleType={scaleType} aggregate={aggregate} />;
};

YScale.propTypes = {
    /**
     * The keys of the fields that will share this scale
     * @type {String[]}
     */
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
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
};

export { YScale };
