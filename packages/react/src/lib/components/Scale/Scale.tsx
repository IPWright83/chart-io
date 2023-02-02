import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useStore } from "react-redux";

import { chartActions } from "../../store";

/**
 * Represents a Scale
 * @return {ReactDOMComponent}   A scale component
 */
const Scale = ({ fields, scale, fromAxis }) => {
    const store = useStore();

    useEffect(() => {
        store.dispatch(chartActions.setScales(fields, scale, fromAxis));
    }, [fields, scale, store.dispatch]);

    return <React.Fragment />;
};

Scale.propTypes = {
    /**
     * The keys of the fields that will share this scale
     * @type {String[]}
     */
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * (Internal) Has this scale been created automatically from an Axis?
     * @type {Boolean}
     */
    fromAxis: PropTypes.bool,
    /**
     * The d3.scale https://github.com/d3/d3-scale
     * @type {Function}
     */
    scale: PropTypes.func,
};

Scale.defaultProps = {
    fromAxis: false,
};

export { Scale };
