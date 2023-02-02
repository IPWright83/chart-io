import type { ITooltipItem, IFormatter } from "@d3-chart/types";
import React from "react";

import { getShape } from "./getShape";
import { formatValue } from "../../../../utils";

const styles = {
    tooltipItem: {
        display: "flex" as const,
        flexDirection: "row" as const,
        width: "100%",
        userSelect: "none" as const,
        pointerEvents: "none" as const,
    },
    tooltipValues: {
        display: "flex" as const,
        flexDirection: "row" as const,
        justifyContent: "space-between" as const,
        width: "100%",
    },
    tooltipSeriesName: {
        marginRight: 15,
        maxWidth: 215,
        whiteSpace: "nowrap" as const,
        overflow: "hidden" as const,
        textOverflow: "ellipsis" as const,
    },
};

export interface ITooltipItemProps extends ITooltipItem, IFormatter {}

/**
 * Represents a row within a Tooltip
 * @return {ReactElement}  The TooltipItem component
 */
export function TooltipItem({ name, value, icon, fill, prefix, suffix, format = formatValue }: ITooltipItemProps) {
    const Shape = getShape(icon);
    const formattedValue = `${prefix ?? ""}${format(name, value)}${suffix ?? ""}`;

    return (
        <div className="chart-it tooltip-item" style={styles.tooltipItem}>
            {Shape && <Shape fill={fill} />}
            <div className="chart-it tooltip-values" style={styles.tooltipValues}>
                <span className="chart-it tooltip-series-name" style={styles.tooltipSeriesName}>
                    {name}:
                </span>
                <span className="chart-it tooltip-series-value">{formattedValue}</span>
            </div>
        </div>
    );
}
