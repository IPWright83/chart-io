import React from "react";
import PropTypes from "prop-types";

import { getShape } from "./getShape";

import "./TooltipItem.css";

const TooltipItem = ({ name, value, seriesType, fill }) => {
    const Shape = getShape(seriesType);

    return (
        <div className="chart-it tooltip-item">
            {Shape ? <Shape fill={fill} /> : null}
            <div className="chart-it tooltip-values">
                <span className="chart-it tooltip-series-name">{name}:</span>
                <span className="chart-it tooltip-series-value">{value}</span>
            </div>
        </div>
    );
};

TooltipItem.propTypes = {
    /**
     * The name of the series being display
     * @type {String}
     */
    name: PropTypes.string.isRequired,
    /**
     * The value for the datum for the series
     * @type {String|Number|Boolean|Date}
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.instanceOf(Date)]),
    /**
     * The type of the series being displayed
     * @type {String}
     */
    seriesType: PropTypes.oneOf(["scatter", "line", "area", "bar", "column"]),
    /**
     * The colour of the series
     * @type {String}
     */
    fill: PropTypes.string.isRequired,
};

export { TooltipItem };
