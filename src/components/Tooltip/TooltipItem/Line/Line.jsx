import React from "react";
import PropTypes from "prop-types";

const Line = ({ fill }) => {
    const style = {
        height: 3,
        width: 10,
        marginTop: 7,
        marginRight: 5,
        marginLeft: 5,
        background: fill,
    };

    return <div style={style} />;
};

Line.propTypes = {
    /**
     * The fill color of the Line
     * @type {String}
     */
    fill: PropTypes.string.isRequired,
};

export { Line };
