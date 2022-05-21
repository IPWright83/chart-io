import React from "react";
import PropTypes from "prop-types";

import "./Circle.css";

const Circle = ({ fill }) => {
    const style = {
        background: fill,
    };

    return <div className="chart-it indicator-circle" style={style} />;
};

Circle.propTypes = {
    /**
     * The fill color of the Circle
     * @type {String}
     */
    fill: PropTypes.string.isRequired,
};

export { Circle };
