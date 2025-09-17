import { IBandwidthScale, IColor } from "@chart-io/types";
import { d3 } from "../../d3";

import type { IRenderProps } from "../../types";
import { ensureNoScaleOverflow, interpolateMultiPath } from "../../utils";

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
}

/**
 * Helper function to render a stacked area plot to SVG
 */
export function stacked({
    x,
    ys,
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
        .curve(d3.curveLinear)
        // @ts-ignore: TODO: Not sure how to fix this
        .x((d) => xScale(d.data[x]) + bandwidth)
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));

    const join = d3.select(layer).selectAll("path").data(stackedData);

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
}
