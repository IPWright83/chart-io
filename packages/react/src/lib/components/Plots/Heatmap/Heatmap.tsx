import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { TooltipOverlay } from "../../TooltipOverlay";

import { HeatmapPlot, IHeatmapPlotProps } from "./HeatmapPlot";

export interface IHeatmapProps
    extends Omit<IChartProps, "children">,
        Omit<IHeatmapPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {}

/**
 * Represents a Heatmap chart, a grid of cells - one per `rows`/`columns` combination in the data -
 * colored by `value`. A self-contained chart: no need to wrap it in another chart component yourself.
 *
 * Set `rowGroupBy`/`columnGroupBy` to a field giving each row/column's group, then toggle
 * `rowsGrouped`/`columnsGrouped` to reorder that axis so rows/columns sharing a group become adjacent -
 * existing cells animate smoothly to their new position rather than the grid simply redrawing. Reserve
 * room for the row/column labels via `plotMargin` (e.g. a wider `left` for long row labels)
 * @param  props       The set of React properties
 * @return             The Heatmap component
 */
export const Heatmap = forwardRef<IChartRef, IHeatmapProps>(
    (
        {
            rows,
            columns,
            value,
            colors,
            padding,
            cornerRadius,
            rowGroupBy,
            columnGroupBy,
            groupGap,
            rowsGrouped,
            columnsGrouped,
            labels,
            interactive,
            ...chartProps
        },
        ref,
    ) => {
        return (
            <Chart ref={ref} {...chartProps}>
                <HeatmapPlot
                    rows={rows}
                    columns={columns}
                    value={value}
                    colors={colors}
                    padding={padding}
                    cornerRadius={cornerRadius}
                    rowGroupBy={rowGroupBy}
                    columnGroupBy={columnGroupBy}
                    groupGap={groupGap}
                    rowsGrouped={rowsGrouped}
                    columnsGrouped={columnsGrouped}
                    labels={labels}
                    interactive={interactive}
                />
                <TooltipOverlay onlyNearest={true} />
            </Chart>
        );
    },
);

Heatmap.displayName = "Heatmap";
