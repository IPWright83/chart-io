import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../types";

import { Column } from "./Column";
import { GroupedColumn } from "./GroupedColumn";
import { StackedColumn } from "./StackedColumn";

/**
 * Represents a set of Column Plots
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const Columns = ({ ys, colors, stacked, grouped, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.colors;

    if (stacked && grouped) {
        throw new Error("Column plots currently do not support both being stacked and grouped");
    }

    if (!stacked && !grouped) {
        throw new Error("Multiple columns plots must be either stacked or grouped");
    }

    if (stacked) {
        return <StackedColumn ys={ys} colors={palette} {...props} />;
    }

    if (grouped) {
        return <GroupedColumn ys={ys} colors={palette} {...props} />;
    }

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Column {...props} key={y} y={y} color={palette[i]} />
            ))}
        </React.Fragment>
    );
};

Columns.propTypes = {
    ...plotsPropTypes,
    ...eventPropTypes,

    /**
     * Should the columns be stacked based on the x-value?
     * @type {Boolean}
     */
    stacked: PropTypes.bool,

    /**
     * Should the columns be grouped based on the x-value? Each "y" is used as a series
     * @type {Boolean}
     */
    grouped: PropTypes.bool,
};

Columns.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

Columns.requiresVirtualCanvas = true;

export { Columns };
