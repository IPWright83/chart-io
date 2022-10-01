import React from "react";
import PropTypes from "prop-types";

import { EventReceiver } from "../EventReceiver";
import { Droplines } from "../Droplines";
import { Markers } from "../Markers";
import { Chart } from "../Chart";
import { Crosshair } from "../Crosshair";
import { TooltipOverlay } from "../TooltipOverlay";

import { shouldShowDroplines } from "./shouldShowDroplines";

const XYChart = ({ children, ...props }) => {
    const showDroplines = shouldShowDroplines(children);
    const showCrosshair = !showDroplines;

    return (
        <Chart {...props}>
            <EventReceiver />
            {children}
            <Markers />
            {showDroplines && <Droplines />}
            {showCrosshair && <Crosshair />}
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
