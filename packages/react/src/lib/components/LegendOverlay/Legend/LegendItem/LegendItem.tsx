import type { ILegendItem, ILegendFormatter } from "@d3-chart/types";
import React from "react";
import { useSelector } from "react-redux";

import { getShape } from "../../../Shapes";
import { chartSelectors, IState } from "../../../../store";

export interface ILegendItemProps extends ILegendItem {
    format?: ILegendFormatter;
}

/**
 * Represents a row within a Legend
 * @return {ReactElement}  The LegendItem component
 */
export function LegendItem({ name, icon, fill, format = (name) => name }: ILegendItemProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const Shape = getShape(icon);

    const styles = {
        legendItem: {
            display: "flex" as const,
            flexDirection: "row" as const,
            width: "100%",
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
        },
        legendSeriesName: {
            marginRight: 15,
            whiteSpace: "nowrap" as const,
            overflow: "hidden" as const,
            textOverflow: "ellipsis" as const,
        },
    };

    return (
        <div className="d3-chart legend-item" style={styles.legendItem}>
            {Shape && <Shape fill={fill} />}
            <div className="d3-chart legend-values" style={styles.legendValues}>
                <span className="d3-chart legend-series-name" style={styles.legendSeriesName}>
                    {format(name)}
                </span>
            </div>
        </div>
    );
}
