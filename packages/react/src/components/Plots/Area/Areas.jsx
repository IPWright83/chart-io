import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../store";
import { plotsDefaultProps, plotsPropTypes } from "../../../types";

import { Area } from "./Area";
import { StackedArea } from "./StackedArea";

/**
 * Represents a set of Area Plots
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Area plot component
 */
const Areas = ({ ys, colors, stacked, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (stacked) {
        return <StackedArea ys={ys} colors={palette} {...props} />;
    }

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Area {...props} key={y} y={y} color={palette[i]} />
            ))}
        </React.Fragment>
    );
};

Areas.propTypes = {
    ...plotsPropTypes,

    /**
     * Should the area plots be stacked based on the x-value?
     * @type {Boolean}
     */
    stacked: PropTypes.bool,
};

Areas.defaultProps = plotsDefaultProps;

Areas.requiresVirtualCanvas = false;

export { Areas };
