import * as d3 from "@chart-io/d3";
import { IBandwidthScale, IColor } from "@chart-io/types";
import type { CurveFactory } from "@chart-io/d3";

import { interpolateMultiPath, isNullOrUndefined } from "../../utils";
import type { IRenderProps } from "../../types";

export interface IRenderAreaPlotProps
    extends Omit<IRenderProps, "onClick" | "onMouseOut" | "onMouseOver" | "interactive"> {
    /**
     * The key of the field used for the y2 position for a stream graph
     */
    y2?: string;
    /**
     * The color of the filled area
     */
    fillColor: IColor;
    /**
     * The color of the stroke area
     */
    strokeColor: IColor;
    /**
     * An optional D3 curve factory
     * See https://d3js.org/d3-shape/curve
     */
    curve?: CurveFactory;
}

/**
 * Helper function to render an area plot to SVG
 */
export function render({
    x,
    y,
    y2,
    curve,
    layer,
    xScale,
    yScale,
    data,
    animationDuration,
    fillColor,
    strokeColor,
}: IRenderAreaPlotProps) {
    if (!layer) {
        return;
    }

    const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;

    // Area renderer that starts at the 0 point
    const area = d3
        .area()
        .x((d) => xScale(d[x]) + bandwidth)
        .y0((d) => (y2 ? yScale(d[y]) : yScale.range()[0]))
        .y1((d) => (y2 ? yScale(d[y2]) : yScale(d[y])))
        .defined((d) => !isNullOrUndefined(d[y]));

    curve && area.curve(curve);

    d3.select(layer)
        .select("path")
        .datum(data)
        .style("fill", fillColor.toString())
        .style("stroke", strokeColor.toString())
        .style("pointer-events", "none")
        .transition("area")
        .duration(animationDuration)
        .attrTween("d", function (d) {
            const previous = d3.select(this).attr("d");
            // @ts-ignore: TODO: Not sure how to fix this
            const current = area(d);
            return interpolateMultiPath(previous, current);
        });
}
