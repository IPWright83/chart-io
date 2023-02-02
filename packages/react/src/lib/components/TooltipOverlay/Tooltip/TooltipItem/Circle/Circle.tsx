import React from "react";
import PropTypes from "prop-types";

const Circle = ({ fill }) => {
    const style = {
        background: fill,
        width: 10,
        height: 10,
        marginTop: 4,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: "50%",
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
