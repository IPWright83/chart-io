import React, { forwardRef } from "react";

import { IChartRef } from "../../Chart";
import { IRectangularChartProps, RectangularChart } from "../../RectangularChart";

import { CirclePackingPlot, ICirclePackingPlotProps } from "./CirclePackingPlot";

export interface ICirclePackingProps
    extends Omit<IRectangularChartProps, "children">,
        Omit<ICirclePackingPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {}

/**
 * Represents a CirclePacking chart, nesting a circle per node of the hierarchy built from the fields
 * listed in `categories` inside its parent's circle, each sized proportionally to `value`. A
 * self-contained chart: no need to wrap it in `<RectangularChart>` yourself. Set `zoomable` to let a
 * click on a node zoom in and refocus the layout on its subtree, and `breadcrumb` to also show the
 * current zoom path as a clickable trail
 * @param  props       The set of React properties
 * @return             The CirclePacking component
 */
export const CirclePacking = forwardRef<IChartRef, ICirclePackingProps>(
    (
        { categories, value, padding, sort, colors, buildHierarchy, labels, showInLegend, interactive, ...chartProps },
        ref,
    ) => {
        return (
            <RectangularChart ref={ref} {...chartProps}>
                <CirclePackingPlot
                    categories={categories}
                    value={value}
                    padding={padding}
                    sort={sort}
                    colors={colors}
                    buildHierarchy={buildHierarchy}
                    labels={labels}
                    showInLegend={showInLegend}
                    interactive={interactive}
                />
            </RectangularChart>
        );
    },
);

CirclePacking.displayName = "CirclePacking";
