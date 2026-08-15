import { chartSelectors, eventSelectors, formatValue, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

/**
 * Represents a center value overlay, which displays the name/value of the currently hovered
 * datapoint in the center of a `<Donut>` or `<StackedDonut>`'s hole, as an alternative to the
 * traditional floating Tooltip. While zoomed in (e.g. a `<StackedDonut zoomable>`) and nothing's
 * hovered, it instead displays the name of the currently focused node - the plot itself renders an
 * invisible circle over its hole so clicking it zooms back out one level
 * @return  The center value overlay component
 */
export function CenterValueOverlay() {
    const cx = useSelector((s: IState) => chartSelectors.dimensions.plot.cx(s));
    const cy = useSelector((s: IState) => chartSelectors.dimensions.plot.cy(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const items = useSelector((s: IState) => eventSelectors.tooltip.items(s, false));
    const zoomPath = useSelector((s: IState) => chartSelectors.zoom.path(s));

    const item = items[0];
    const zoomedName = !item && zoomPath.length > 0 ? zoomPath[zoomPath.length - 1] : undefined;

    if (!item && !zoomedName) {
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
            {item ? (
                <React.Fragment>
                    <text x={cx} y={cy - 6} textAnchor="middle" style={{ ...style, fontSize: theme.font.size }}>
                        {item.name}
                    </text>
                    <text x={cx} y={cy + 14} textAnchor="middle" style={{ ...style, fontSize: theme.font.size * 1.3, fontWeight: "bold" }}>
                        {formatValue(item.name, item.value)}
                    </text>
                </React.Fragment>
            ) : (
                <text x={cx} y={cy + 5} textAnchor="middle" style={{ ...style, fontSize: theme.font.size * 1.3, fontWeight: "bold" }}>
                    {zoomedName}
                </text>
            )}
        </g>
    );
}
