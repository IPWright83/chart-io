import type { ILegendFormatter, ILegendItem } from "@d3-chart/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../store";
import { LegendItem } from "./LegendItem";

export interface ILegendProps {
    /**
     * A style object controling the position of the toolip
     * @type {Object}
     */
    positionStyle?: Record<string, any>;
    /**
     * An array of legend items to display
     * @type {Array<LegendItem>}
     */
    items: Array<ILegendItem>;
    /**
     * A set of custom formatters for the Legend
     */
    formatters?: Record<string, ILegendFormatter>;
}

/**
 * Represents a Legend
 * @return The Legend component
 */
export function Legend({ items, positionStyle, formatters = {} }: ILegendProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const style = {
        border: `thin solid ${theme.legend.border}`,
        display: "inline-block",
        ...positionStyle,
        padding: theme.legend.padding,
        background: theme.legend.background.toString(),
        opacity: theme.legend.opacity,
        overflow: "hidden",
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="d3-chart legend" style={style}>
            {items.map((item) => {
                /**
                 * A format is of the shape:
                 * {
                 *     formatFunc: (name: string) => string;
                 * }
                 */
                const formatter = formatters[item.name] || undefined;

                return <LegendItem key={`${item.name}`} format={formatter} {...item} />;
            })}
        </div>
    );
}
