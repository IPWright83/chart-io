import PropTypes from "prop-types";
import React from "react";

import { AreaBase } from "./AreaBase";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

const WrappedCanvasArea = withCanvas(withXYPlot(AreaBase), "plot area");
const WrappedSVGArea = withSVG(withXYPlot(AreaBase), "plot area");

/**
 * Represents a Area plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Area plot component
 */
const Area = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <WrappedCanvasArea {...props} />;
    }

    return <WrappedSVGArea {...props} />;
};

Area.propTypes = {
    ...AreaBase.propTypes,

    /**
     * The key of the field used for the y2 position for a stream graph
     * @type {String}
     */
    y2: PropTypes.string,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

Area.requiresVirtualCanvas = false;

export { Area };
