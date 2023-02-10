import type { IFormatter , ITooltipItem } from "@d3-chart/types";
import React from "react";

import { TooltipItem } from "./TooltipItem";

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
    /**
     * A set of custom formatters for the Tooltip
     */
    formatters?: Record<string, IFormatter>;
}

/**
 * Represents a Tooltip
 * @return The Tooltip component
 */
export function Tooltip({ borderColor, items, positionStyle, formatters = {} }: ITooltipProps) {
    const style = {
        border: borderColor ? `thin solid ${borderColor}` : "thin solid #ccc",
        display: "inline-block",
        ...positionStyle,
        padding: 8,
        maxWidth: 300,
        background: "#fff",
        opacity: 0.8,
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="chart-it tooltip" style={style}>
            {items.map((item) => {
                /**
                 * A format is of the shape:
                 * {
                 *     prefix: string
                 *     suffix: string
                 *     formatFunc: (name: string, value: any) => string;
                 * }
                 */
                const formatter = formatters[item.name] || ({} as IFormatter);

                return (
                    <TooltipItem
                        key={`${item.name}`}
                        prefix={formatter.prefix}
                        suffix={formatter.suffix}
                        format={formatter.format}
                        {...item}
                    />
                );
            })}
        </div>
    );
}
