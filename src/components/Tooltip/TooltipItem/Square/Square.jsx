import React from "react";
import PropTypes from "prop-types";

const Square = ({ fill }) => {
    const style = {
        height: 10,
        width: 10,
        marginTop: 4,
        marginRight: 5,
        marginLeft: 5,
        background: fill,
    };

    return <div style={style} />;
};

Square.propTypes = {
    /**
     * The fill color of the Square
     * @type {String}
     */
    fill: PropTypes.string.isRequired,
};

export { Square };
