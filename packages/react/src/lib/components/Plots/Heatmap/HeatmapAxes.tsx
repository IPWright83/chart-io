import React from "react";

import { XAxis, YAxis } from "../../Axis";

import { heatmapAxisFor, IUseHeatmapDomainsProps, useHeatmapDomains } from "./useHeatmapLayout";
import { usePivot } from "../usePivot";

export interface IHeatmapAxesProps extends IUseHeatmapDomainsProps {
    /**
     * Lets the user switch between the full grid, a row-stacked-bar-chart and a
     * column-stacked-bar-chart - see `<PivotControl>`
     * @default false
     */
    pivotable?: boolean;
}

/**
 * Renders the `<XAxis>`/`<YAxis>` a `<Heatmap>` needs for the current pivot - a band scale over
 * `columns`/`rows` in the full grid, switching to a linear scale over `value` on whichever axis is
 * pivoted away. Deliberately a separate component from `<HeatmapPlot>`: it only reads `pivot` and the
 * row/column domains (derived from `data`), never the scale it itself produces, so registering a new
 * scale here doesn't re-render this component into re-registering another
 * @param  props       The set of React properties
 * @return             The HeatmapAxes component
 */
export function HeatmapAxes({ rows, columns, value, pivotable = false }: IHeatmapAxesProps) {
    const { pivot } = usePivot(pivotable);
    const { rowValues, columnValues, maxRowTotal, maxColumnTotal } = useHeatmapDomains({ rows, columns, value });

    const { xField, yField, xScaleType, yScaleType, xDomain, yDomain } = heatmapAxisFor(
        pivot,
        rows,
        columns,
        value,
        maxRowTotal,
        maxColumnTotal,
        rowValues,
        columnValues,
    );

    return (
        <React.Fragment>
            <XAxis fields={[xField]} scaleType={xScaleType} domain={xDomain} />
            <YAxis fields={[yField]} scaleType={yScaleType} domain={yDomain} />
        </React.Fragment>
    );
}
