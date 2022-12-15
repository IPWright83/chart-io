import React from "react";
import PropTypes from "prop-types";

const Line = ({ fill }) => {
    const style = {
        background: fill,
        width: 10,
        height: 3,
        marginTop: 7,
        marginLeft: 5,
        marginRight: 5,
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
