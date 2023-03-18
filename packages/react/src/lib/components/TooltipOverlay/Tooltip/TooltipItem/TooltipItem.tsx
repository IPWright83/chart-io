import type { ITooltipItem, ITooltipFormatter } from "@d3-chart/types";
import React from "react";
import { useSelector } from "react-redux";

import { getShape } from "../../../Shapes";
import { formatValue } from "../../../../utils";
import { chartSelectors, IState } from "../../../../store";

export interface ITooltipItemProps extends ITooltipItem, ITooltipFormatter {}

/**
 * Represents a row within a Tooltip
 * @return {ReactElement}  The TooltipItem component
 */
export function TooltipItem({ name, value, icon, fill, prefix, suffix, format = formatValue }: ITooltipItemProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const Shape = getShape(icon);
    const formattedValue = `${prefix ?? ""}${format(name, value)}${suffix ?? ""}`;

    const styles = {
        tooltipItem: {
            display: "flex" as const,
            flexDirection: "row" as const,
            width: "100%",
            userSelect: "none" as const,
            pointerEvents: "none" as const,
            color: theme.tooltip.text.toString(),
            fontSize: theme.font.size,
            fontFamily: theme.font.family,
        },
        tooltipValues: {
            display: "flex" as const,
            flexDirection: "row" as const,
            justifyContent: "space-between" as const,
            width: "100%",
            flexGrow: 1,
            flexShrink: 1,
        },
        tooltipSeriesName: {
            marginRight: 15,
            maxWidth: 215,
            whiteSpace: "nowrap" as const,
            overflow: "hidden" as const,
            textOverflow: "ellipsis" as const,
            flexGrow: 1,
            flexShrink: 1,
        },
    };

    return (
        <div className="d3-chart tooltip-item" style={styles.tooltipItem}>
            {Shape && <Shape fill={fill} />}
            <div className="d3-chart tooltip-values" style={styles.tooltipValues}>
                <span className="d3-chart tooltip-series-name" style={styles.tooltipSeriesName}>
                    {name}:
                </span>
                <span className="d3-chart tooltip-series-value">{formattedValue}</span>
            </div>
        </div>
    );
}
