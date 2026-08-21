import { chartSelectors, IState } from "@chart-io/core";
import type { ILegendFormatter, ILegendItem, ISizeLegend as ISizeLegendData } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { LegendItem } from "./LegendItem";
import { SizeLegend } from "./SizeLegend";

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
     * The size legend registered by a `<ZAxis>`, if any - rendered at the bottom of the Legend
     */
    sizeLegend?: ISizeLegendData | null;
    /**
     * True if the legend should be displayed in a horizontal appearance
     */
    horizontal?: boolean;
    /**
     * A set of custom formatters for the Legend
     */
    formatters?: Record<string, ILegendFormatter>;
    /**
     * True while the Legend is being dragged to a new docked position
     */
    dragging?: boolean;
    /**
     * Fired when a drag gesture starts on the Legend, picking it up to move to a new docked position
     */
    onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
    /**
     * Fired as a picked-up Legend is dragged around the chart
     */
    onPointerMove?: (event: React.PointerEvent<HTMLDivElement>) => void;
    /**
     * Fired when a picked-up Legend is dropped, docking it at the nearest compass position
     */
    onPointerUp?: (event: React.PointerEvent<HTMLDivElement>) => void;
    /**
     * Fired if a drag gesture is interrupted (e.g. by a browser context menu)
     */
    onPointerCancel?: (event: React.PointerEvent<HTMLDivElement>) => void;
}

/**
 * Represents a Legend
 * @return The Legend component
 */
export function Legend({
    items,
    sizeLegend,
    positionStyle,
    horizontal = false,
    formatters = {},
    dragging = false,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
}: ILegendProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const isDraggable = !!onPointerDown;

    // The outer box always stacks its content top-to-bottom, so a size legend sits on its own row
    // below the items rather than being wrapped in amongst them - `horizontal` only controls how
    // the items themselves are laid out relative to each other
    const style = {
        border: `thin solid ${theme.legend.border}`,
        display: "flex" as const,
        flexDirection: "column" as const,
        ...positionStyle,
        padding: theme.legend.padding,
        background: theme.legend.background.toString(),
        opacity: theme.legend.opacity,
        overflow: "hidden",
        // The wrapping foreignObject is pointer-events: none so it doesn't block the chart
        // underneath it - the Legend itself opts back in so it can be dragged
        pointerEvents: "auto" as const,
        touchAction: isDraggable ? ("none" as const) : undefined,
        cursor: isDraggable ? (dragging ? "grabbing" : "grab") : undefined,
    };

    const itemsStyle = {
        display: "flex" as const,
        flexDirection: horizontal ? ("row" as const) : ("column" as const),
        flexWrap: "wrap" as const,
    };

    if ((!items || items.length === 0) && !sizeLegend) {
        return null;
    }

    return (
        <div
            className="chart-io legend"
            style={style}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
        >
            {items.length > 0 && (
                <div className="chart-io legend-items" style={itemsStyle}>
                    {items.map((item, index) => {
                        /**
                         * A format is of the shape:
                         * {
                         *     formatFunc: (name: string) => string;
                         * }
                         */
                        const formatter = formatters[item.name] || undefined;

                        return <LegendItem key={index} format={formatter} {...item} />;
                    })}
                </div>
            )}
            {sizeLegend && <SizeLegend sizeLegend={sizeLegend} />}
        </div>
    );
}
