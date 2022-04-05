import React from "react";
import PropTypes from "prop-types";

import { Background } from "../Background";
import { Droplines } from "../Droplines";
import { Markers } from "../Markers";
import { Chart } from "../Chart";
import { TooltipOverlay } from "../TooltipOverlay";

const XYChart = ({ children, ...props }) => {
    return (
        <Chart {...props}>
            <Background />
            {children}
            <Markers />
            <Droplines />
            <TooltipOverlay />
        </Chart>
    );
};

XYChart.propTypes = {
    /**
     * The child components (Plots) for the chart
     * @type {Array<Node>}
     */
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

XYChart.defaultProps = {
    width: 500,
    height: 500,
    animationDuration: 250,
    margin: {
        left: 40,
        right: 40,
        bottom: 40,
        top: 40,
    },
    data: [],
    useCanvas: false,
};

export { XYChart };
