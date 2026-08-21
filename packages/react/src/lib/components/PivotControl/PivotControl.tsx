import { chartSelectors, IPivot, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { usePivot } from "../Plots/usePivot";

const OPTIONS: Array<{ pivot: IPivot; label: string }> = [
    { pivot: "grid", label: "Grid" },
    { pivot: "rows", label: "Rows" },
    { pivot: "columns", label: "Columns" },
];

/**
 * Lets the user switch a pivotable `<Heatmap pivotable>` between its full grid, row-stacked-bars and
 * column-stacked-bars layouts - a clickable equivalent of the "View" control in the Observable
 * notebook this feature is based on. Renders nothing unless pivoting is enabled
 * @return The PivotControl component
 */
export function PivotControl() {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const pivotable = useSelector((s: IState) => chartSelectors.pivotable(s));
    const { pivot, pivotTo } = usePivot();

    if (!pivotable) {
        return null;
    }

    const style = {
        position: "absolute" as const,
        top: 8,
        right: 8,
        display: "inline-block",
        padding: theme.tooltip.padding,
        background: theme.tooltip.background.toString(),
        pointerEvents: "auto" as const,
        fontSize: 12,
    };

    return (
        <foreignObject width="100%" height="100%" style={{ pointerEvents: "none" }}>
            <div className="chart-io pivot-control" style={style}>
                {OPTIONS.map(({ pivot: optionPivot, label }, index) => (
                    <React.Fragment key={optionPivot}>
                        {index > 0 && " / "}
                        <span
                            style={{
                                cursor: "pointer",
                                fontWeight: pivot === optionPivot ? "bold" : "normal",
                            }}
                            onClick={() => pivotTo(optionPivot)}
                        >
                            {label}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </foreignObject>
    );
}
