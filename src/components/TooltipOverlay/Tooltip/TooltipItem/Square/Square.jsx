import React from "react";
import PropTypes from "prop-types";

import "./Square.css";

const Square = ({ fill }) => {
    const style = {
        background: fill,
    };

    return <div className="chart-it indicator-square" style={style} />;
};

Square.propTypes = {
    /**
     * The fill color of the Square
     * @type {String}
     */
    fill: PropTypes.string.isRequired,
};

export { Square };
