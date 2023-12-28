import { chartSelectors, IState } from "@chart-io/core";
import type { ITooltipFormatter, ITooltipItem } from "@chart-io/types";

import React from "react";
import { useSelector } from "react-redux";

import type { ITooltipItemProps } from "./TooltipItem";
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
    formatters?: Record<string, ITooltipFormatter>;
    /**
     * Allows overriding the TooltipItem Component that is used
     */
    tooltipItemComponent?: React.ComponentType<ITooltipItemProps>;
}

/**
 * Represents a Tooltip
 * @return The Tooltip component
 */
export function Tooltip({ borderColor, items, positionStyle, formatters = {}, tooltipItemComponent }: ITooltipProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const style = {
        border: borderColor ? `thin solid ${borderColor}` : "thin solid #ccc",
        display: "inline-block",
        ...positionStyle,
        padding: theme.tooltip.padding,
        maxWidth: 300,
        background: theme.tooltip.background.toString(),
        opacity: theme.tooltip.opacity,
    };

    if (!items || items.length === 0) {
        return null;
    }

    const TooltipItemComponent = tooltipItemComponent ?? TooltipItem;
    return (
        <div className="chart-io tooltip" style={style}>
            {items.map((item) => {
                /**
                 * A format is of the shape:
                 * {
                 *     prefix: string
                 *     suffix: string
                 *     formatFunc: (name: string, value: any) => string;
                 * }
                 */
                const formatter = formatters[item.name] || ({} as ITooltipFormatter);

                return (
                    <TooltipItemComponent
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
