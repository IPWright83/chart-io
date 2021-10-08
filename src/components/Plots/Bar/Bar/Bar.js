import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { BarBase } from "./BarBase";

const CanvasBar = withCanvas(withXYPlot(BarBase));
const SVGBar = withSVG(withXYPlot(BarBase));

/**
 * Represents a Bar plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Bar plot component
 */
const Bar = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <CanvasBar {...props} />;
    }

    return <SVGBar {...props} />;
};

Bar.propTypes = {
    ...BarBase.propTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

Bar.defaultProps = {
    ...BarBase.defaultProps,
    useCanvas: false,
};

export { Bar };
