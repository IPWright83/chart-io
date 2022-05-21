import React from "react";
import PropTypes from "prop-types";

import "./Line.css";

const Line = ({ fill }) => {
    const style = {
        background: fill,
    };

    return <div className="chart-it indicator-line" style={style} />;
};

Line.propTypes = {
    /**
     * The fill color of the Line
     * @type {String}
     */
    fill: PropTypes.string.isRequired,
};

export { Line };
