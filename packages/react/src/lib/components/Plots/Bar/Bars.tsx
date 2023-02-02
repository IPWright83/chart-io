import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../types";

import { Bar } from "./Bar";
import { GroupedBar } from "./GroupedBar";
import { StackedBar } from "./StackedBar";

/**
 * Represents a set of Bar Plots
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Bar plot component
 */
const Bars = ({ xs, colors, stacked, grouped, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (stacked && grouped) {
        throw new Error("Bar plots currently do not support both being stacked and grouped");
    }

    if (!stacked && !grouped) {
        throw new Error("Multiple bars plots must be either stacked or grouped");
    }

    if (stacked) {
        return <StackedBar xs={xs} colors={palette} {...props} />;
    }

    if (grouped) {
        return <GroupedBar xs={xs} colors={palette} {...props} />;
    }

    return (
        <React.Fragment>
            {xs.map((x, i) => (
                <Bar {...props} key={x} x={x} color={palette[i]} />
            ))}
        </React.Fragment>
    );
};

const plotsPropTypesClone = {
    ...plotsPropTypes,

    /**
     * The set of x fields to use to access the data for each plot
     * @type {[type]}
     */
    xs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

delete plotsPropTypesClone.ys;
delete plotsPropTypesClone.x;

Bars.propTypes = {
    ...plotsPropTypesClone,
    ...eventPropTypes,

    /**
     * Should the bars be stacked based on the x-value?
     * @type {Boolean}
     */
    stacked: PropTypes.bool,

    /**
     * Should the bars be grouped based on the x-value? Each "y" is used as a series
     * @type {Boolean}
     */
    grouped: PropTypes.bool,
};

Bars.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

Bars.requiresVirtualCanvas = true;

export { Bars };
