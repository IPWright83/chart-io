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
    domain,
    showGridlines,
    title,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    ticks,
    tickFormat,
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
                ticks={ticks}
                tickFormat={tickFormat}
            />
            <YScale fields={fields} scaleType={scaleType} aggregate={aggregate} domain={domain} fromAxis={true} />
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
     * (Optional) An override of the domain to use with the d3 scale
     * @type {Array}
     */
    domain: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    ),
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
};

YAxis.defaultProps = {
    position: "left",
    aggregate: false,
    showGridlines: true,
};

export { YAxis };
