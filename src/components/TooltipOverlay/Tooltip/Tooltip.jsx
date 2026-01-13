import React from "react";
import PropTypes from "prop-types";

import { TooltipItem } from "./TooltipItem";

import "./Tooltip.css";

/**
 * Represents a Tooltip
 * @return {ReactElement}  The Tooltip component
 */
const Tooltip = ({ borderColor, items }) => {
    const style = {
        border: borderColor ? `thin solid ${borderColor}` : undefined,
        display: "inline-block",
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="chart-it tooltip" style={style}>
            {items.map((item) => (
                <TooltipItem key={`${item.name}:${item.type}`} {...item} />
            ))}
        </div>
    );
};

Tooltip.propTypes = {
    /**
     * An optional color for the border of the tooltip - usually based on the series color
     * @type {String}
     */
    borderColor: PropTypes.string,
    /**
     * An array of tooltip items to display
     * @type {Array<TooltipItem>}
     */
    items: PropTypes.arrayOf(PropTypes.object),
};

export { Tooltip };
