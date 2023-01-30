import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../types";

import { Scatter } from "./Scatter";

/**
 * Represents a set of Scatter Plots
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Scatter plot component
 */
const Scatters = ({ ys, colors, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Scatter {...props} key={y} y={y} color={palette[i]} />
            ))}
        </React.Fragment>
    );
};

Scatters.propTypes = {
    ...plotsPropTypes,
    ...eventPropTypes,

    /**
     * The fixed radius to use for points. This is ignored if z is provided
     * @type {Number}
     */
    radius: PropTypes.number,
};

Scatters.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
    radius: 5,
};

Scatters.requiresVirtualCanvas = true;

export { Scatters };
