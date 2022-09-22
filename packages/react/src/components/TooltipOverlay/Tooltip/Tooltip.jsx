import React from "react";
import PropTypes from "prop-types";

import { TooltipItem } from "./TooltipItem";

import "./Tooltip.css";

/**
 * Represents a Tooltip
 * @return {ReactElement}  The Tooltip component
 */
const Tooltip = ({ borderColor, items, positionStyle }) => {
    const style = {
        border: borderColor ? `thin solid ${borderColor}` : undefined,
        display: "inline-block",
        ...positionStyle,
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="chart-it tooltip" style={style}>
            {items.map((item) => (
                <TooltipItem key={`${item.name}`} {...item} />
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
     * A style object controling the position of the toolip
     * @type {Object}
     */
    positionStyle: PropTypes.object,
    /**
     * An array of tooltip items to display
     * @type {Array<TooltipItem>}
     */
    items: PropTypes.arrayOf(PropTypes.object),
};

export { Tooltip };
