import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../store";
import { plotsDefaultProps, plotsPropTypes } from "../../../types";

import { Line } from "./Line";

/**
 * Represents a set of Line Plots
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
const Lines = ({ ys, colors, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.colors;

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Line {...props} key={y} y={y} color={palette[i]} />
            ))}
        </React.Fragment>
    );
};

Lines.propTypes = plotsPropTypes;
Lines.defaultProps = plotsDefaultProps;

Lines.requiresVirtualCanvas = false;

export { Lines };
