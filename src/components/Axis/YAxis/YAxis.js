import PropTypes from "prop-types";
import React from "react";
import { Axis } from "../Axis";
import { YScale } from "../../Scale";

/**
 * Represents a YAxis component
 * @return {ReactElement}  The Y Axis component
 */
const YAxis = ({
    position,
    fields,
    scaleType,
    aggregate,
    showGridlines,
    title,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
}) => {
    return (
        <React.Fragment>
            <Axis
                position={position}
                fields={fields}
                showGridlines={showGridlines}
                title={title}
                tickSizeInner={tickSizeInner}
                tickSizeOuter={tickSizeOuter}
                tickPadding={tickPadding}
            />
            <YScale fields={fields} scaleType={scaleType} aggregate={aggregate} />
        </React.Fragment>
    );
};

YAxis.propTypes = {
    /**
     * The position of the axis [left, right]
     * @type {String}
     */
    position: PropTypes.oneOf(["left", "right"]).isRequired,
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
};

YAxis.defaultProps = {
    position: "left",
    aggregate: false,
    showGridlines: true,
};

export { YAxis };
