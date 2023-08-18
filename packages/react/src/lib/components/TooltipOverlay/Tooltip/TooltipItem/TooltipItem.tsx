import type { ITooltipFormatter, ITooltipItem } from "@chart-io/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";
import { formatValue } from "../../../../utils";
import { getShape } from "../../../Shapes";

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
            marginTop: 2,
            whiteSpace: "nowrap" as const,
            overflow: "hidden" as const,
            textOverflow: "ellipsis" as const,
            textAlign: "middle",
            flexGrow: 1,
            flexShrink: 1,
            marginLeft: Shape ? 0 : 5,
        },
    };

    return (
        <div className="chart-io tooltip-item" style={styles.tooltipItem}>
            {Shape && <Shape fill={fill} />}
            <div className="chart-io tooltip-values" style={styles.tooltipValues}>
                <span className="chart-io tooltip-series-name" style={styles.tooltipSeriesName}>
                    {name}:
                </span>
                <span className="chart-io tooltip-series-value">{formattedValue}</span>
            </div>
        </div>
    );
}
