import React from "react";
import PropTypes from "prop-types";

import { getShape } from "./getShape";

const styles = {
    tooltipItem: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        userSelect: "none",
        pointerEvents: "none",
    },
    tooltipValues: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    tooltipSeriesName: {
        marginRight: 15,
        maxWidth: 215,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
};

/**
 * Represents a row within a Tooltip
 * @return {ReactElement}  The TooltipItem component
 */
const TooltipItem = ({ name, value, seriesType, fill, formatValue }) => {
    const Shape = getShape(seriesType);

    return (
        <div className="chart-it tooltip-item" style={styles.tooltipItem}>
            {Shape && <Shape fill={fill} />}
            <div className="chart-it tooltip-values" style={styles.tooltipValues}>
                <span className="chart-it tooltip-series-name" style={styles.tooltipSeriesName}>
                    {name}:
                </span>
                <span className="chart-it tooltip-series-value">{formatValue(name, value)}</span>
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
    /**
     * A function that maps the value to a string
     * @type {Function}
     */
    formatValue: PropTypes.func.isRequired,
};

export { TooltipItem };
