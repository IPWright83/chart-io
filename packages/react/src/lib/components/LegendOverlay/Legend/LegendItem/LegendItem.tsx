import type { ILegendFormatter, ILegendItem } from "@chart-it/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";
import { getShape } from "../../../Shapes";

export interface ILegendItemProps extends ILegendItem {
    /**
     * A custom formatter for the Legend item
     */
    format?: ILegendFormatter;
}

/**
 * Represents a row within a Legend
 * @return {ReactElement}  The LegendItem component
 */
export function LegendItem({ name, icon, color, format = (name) => name }: ILegendItemProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const Shape = getShape(icon);

    const styles = {
        legendItem: {
            display: "flex" as const,
            flexDirection: "row" as const,
            userSelect: "none" as const,
            pointerEvents: "none" as const,
            color: theme.tooltip.text.toString(),
            fontSize: theme.font.size,
            fontFamily: theme.font.family,
        },
        legendValues: {
            display: "flex" as const,
            flexDirection: "row" as const,
            justifyContent: "space-between" as const,
            width: "100%",
            flexGrow: 1,
            flexShrink: 1,
        },
        legendSeriesName: {
            marginRight: 15,
            whiteSpace: "nowrap" as const,
            overflow: "hidden" as const,
            textOverflow: "ellipsis" as const,
            flexGrow: 1,
            flexShrink: 1,
        },
    };

    return (
        <div className="chart-it legend-item" style={styles.legendItem}>
            {Shape && <Shape fill={color} />}
            <div className="chart-it legend-values" style={styles.legendValues}>
                <span className="chart-it legend-series-name" style={styles.legendSeriesName}>
                    {format(name)}
                </span>
            </div>
        </div>
    );
}
