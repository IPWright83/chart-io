import React from "react";
import PropTypes from "prop-types";

import { Background } from "../Background";
import { Droplines } from "../Droplines";
import { Markers } from "../Markers";
import { Chart } from "../Chart";
import { XAxis, YAxis } from "../Axis";

const XYChart = ({ children, xs, ys, ...props }) => {
    return (
        <Chart {...props}>
            <Background />
            {children}
            <YAxis fields={xs} />
            <XAxis fields={ys} />
            <Markers />
            <Droplines />
        </Chart>
    );
};

XYChart.propTypes = {
    /**
     * The set of x fields to use to access the data for each plot
     * @type {Array<String>}
     */
    xs: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The set of y fields to use to access the data for each plot
     * @type {Array<String>}
     */
    ys: PropTypes.arrayOf(PropTypes.string).isRequired,
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
