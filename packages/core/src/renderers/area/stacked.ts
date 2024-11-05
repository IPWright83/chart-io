import * as d3 from "@chart-io/d3";
import { IBandwidthScale, IColor } from "@chart-io/types";
import type { CurveFactory } from "@chart-io/d3";

import { ensureNoScaleOverflow, interpolateMultiPath } from "../../utils";
import type { IRenderProps } from "../../types";

export interface IRenderStackedAreaPlotProps
    extends Omit<IRenderProps, "onClick" | "onMouseOut" | "onMouseOver" | "interactive" | "y"> {
    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;
    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
     /**
     * An optional D3 curve factory
     * See https://d3js.org/d3-shape/curve
     */
    curve?: CurveFactory;
}

/**
 * Helper function to render a stacked area plot to SVG
 */
export function stacked({
    x,
    ys,
    curve,
    layer,
    xScale,
    yScale,
    data,
    animationDuration,
    colors,
    theme,
}: IRenderStackedAreaPlotProps) {
    if (!layer) {
        return;
    }

    const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;
    ensureNoScaleOverflow(yScale, data, ys, "StackedSVGArea");

    // @ts-ignore: TODO: Not sure how to fix this
    const stackedData = d3.stack().keys(ys)(data);
    const colorScale = d3.scaleOrdinal().domain(ys).range(colors);

    const area = d3
        .area()
        // @ts-ignore: TODO: Not sure how to fix this
        .x((d) => xScale(d.data[x]) + bandwidth)
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));

    curve && area.curve(curve);

    const join = d3
        .select(layer)
        .selectAll("path")
        .data(stackedData);

    join.style("fill", (d) => colorScale(d.key).toString())
        .style("stroke", (d) => d3.color(colorScale(d.key).toString()).darker().toString())
        .style("opacity", theme.series.opacity)
        .style("pointer-events", "none")
        .transition("area")
        .duration(animationDuration)
        .ease(d3.easeCubicInOut)
        .attrTween("d", function (d) {
            const previous = d3.select(this).attr("d");
            // @ts-ignore: TODO: Not sure how to fix this
            const current = area(d);
            return interpolateMultiPath(previous, current);
        });

    // If we have a curve factory we need to return the path which is used
    // to calculate positions taking the curveFactory into account.
    // This is required for positioning tooltips and markers because the scales
    // will not directly match up with the curved path
    return curve && stackedData.map(data => ({ path: area(data), key: data.key }));
}
