import PropTypes from "prop-types";
import React from "react";
import { Axis } from "../Axis";
import { XScale } from "../../Scale";

/**
 * Represents an XAxis component
 * @return {ReactElement}  The X Axis component
 */
const XAxis = ({ position, fields, scaleType, aggregate }) => {
    return (
        <React.Fragment>
            <Axis position={position} fields={fields} />
            <XScale fields={fields} scaleType={scaleType} aggregate={aggregate} />
        </React.Fragment>
    );
};

XAxis.propTypes = {
    /**
     * The position of the axis [top, bottom]
     * @type {String}
     */
    position: PropTypes.oneOf(["top", "bottom"]),
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

XAxis.defaultProps = {
    position: "bottom",
};

export { XAxis };
