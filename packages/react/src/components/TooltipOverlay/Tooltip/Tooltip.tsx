import React from "react";
import PropTypes from "prop-types";

import { TooltipItem } from "./TooltipItem";
import type { ITooltipItem } from "../../../types";

import "./Tooltip.css";

export interface ITooltipProps {
    /**
     * An optional color for the border of the tooltip - usually based on the series color
     */
    borderColor?: string;
    /**
     * A style object controling the position of the toolip
     * @type {Object}
     */
    positionStyle?: Record<string, any>;
    /**
     * An array of tooltip items to display
     * @type {Array<TooltipItem>}
     */
    items: Array<ITooltipItem>;
}

/**
 * Represents a Tooltip
 * @return {ReactElement}  The Tooltip component
 */
const Tooltip = ({ borderColor, items, positionStyle }: ITooltipProps) => {
    const style = {
        border: borderColor ? `thin solid ${borderColor}` : undefined,
        display: "inline-block",
        ...(positionStyle ?? {}),
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

export { Tooltip };
