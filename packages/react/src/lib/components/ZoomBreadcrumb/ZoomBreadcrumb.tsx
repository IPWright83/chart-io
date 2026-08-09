import { chartSelectors, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useZoom } from "../Plots/useZoom";

/**
 * Displays the current zoom path of a zoomable hierarchical plot (e.g. `<Dendrogram zoomable>`) as a
 * clickable trail, letting the user jump back to any ancestor level - or back out entirely via "All".
 * Renders nothing while fully zoomed out
 * @return The ZoomBreadcrumb component
 */
export function ZoomBreadcrumb() {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const { path, zoomTo } = useZoom();

    if (path.length === 0) {
        return null;
    }

    const style = {
        position: "absolute" as const,
        top: 8,
        left: 8,
        display: "inline-block",
        padding: theme.tooltip.padding,
        background: theme.tooltip.background.toString(),
        border: "thin solid #ccc",
        pointerEvents: "auto" as const,
        fontSize: 12,
    };

    return (
        <foreignObject width="100%" height="100%" style={{ pointerEvents: "none" }}>
            <div className="chart-io zoom-breadcrumb" style={style}>
                <span style={{ cursor: "pointer" }} onClick={() => zoomTo([])}>
                    All
                </span>
                {path.map((key, index) => (
                    <React.Fragment key={key}>
                        {" / "}
                        <span style={{ cursor: "pointer" }} onClick={() => zoomTo(path.slice(0, index + 1))}>
                            {key}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </foreignObject>
    );
}
