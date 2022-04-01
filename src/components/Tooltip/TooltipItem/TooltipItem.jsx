import React from "react";
import PropTypes from "prop-types";

import { getShape } from "./getShape";

const TooltipItem = ({ name, value, seriesType, fill }) => {
    const Shape = getShape(seriesType);

    const styles = {
        container: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
        },
        values: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        },
        name: {
            marginRight: 15,
        },
    };

    return (
        <div style={styles.container}>
            <Shape fill={fill} />
            <div style={styles.values}>
                <span style={styles.name}>{name}:</span>
                <span>{value}</span>
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
    value: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.boolean, PropTypes.Date]),
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
