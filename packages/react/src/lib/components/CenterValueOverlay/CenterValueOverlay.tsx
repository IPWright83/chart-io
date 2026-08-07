import { chartSelectors, eventSelectors, formatValue, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

/**
 * Represents a center value overlay, which displays the name/value of the currently hovered
 * datapoint in the center of a `<Donut>` or `<StackedDonut>`'s hole, as an alternative to the
 * traditional floating Tooltip
 * @return  The center value overlay component
 */
export function CenterValueOverlay() {
    const cx = useSelector((s: IState) => chartSelectors.dimensions.plot.cx(s));
    const cy = useSelector((s: IState) => chartSelectors.dimensions.plot.cy(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const items = useSelector((s: IState) => eventSelectors.tooltip.items(s, false));

    const item = items[0];

    if (!item) {
        return null;
    }

    const style = {
        pointerEvents: "none" as const,
        userSelect: "none" as const,
        fill: theme.tooltip.text.toString(),
        fontFamily: theme.font.family,
    };

    return (
        <g className="chart-io center-value">
            <text x={cx} y={cy - 6} textAnchor="middle" style={{ ...style, fontSize: theme.font.size }}>
                {item.name}
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle" style={{ ...style, fontSize: theme.font.size * 1.3, fontWeight: "bold" }}>
                {formatValue(item.name, item.value)}
            </text>
        </g>
    );
}
