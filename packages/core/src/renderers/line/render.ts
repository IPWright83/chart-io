import { IBandwidthScale, IColor } from "@Types";
import { d3 } from "../../d3";

import type { IRenderProps } from "../../types";
import { interpolateMultiPath, isNullOrUndefined } from "../../utils";

export interface IRenderLinePlotProps
    extends Omit<IRenderProps, "onClick" | "onMouseOut" | "onMouseOver" | "interactive"> {
    /**
     * The color of each data point
     */
    color: IColor;
}

/**
 * Helper function to render a line plot to SVG
 */
export function render({ x, y, layer, xScale, yScale, data, animationDuration, color, theme }: IRenderLinePlotProps) {
    if (!layer) {
        return;
    }

    const seriesColor = color || theme.series.colors[0];
    const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;

    // Line renderer that starts at the 0 point
    const line = d3
        .line()
        .x((d) => xScale(d[x]) + bandwidth)
        .y((d) => yScale(d[y]))
        .defined((d) => !isNullOrUndefined(d[y]));

    d3.select(layer)
        .select("path")
        .datum(data)
        .transition("line")
        .duration(animationDuration)
        .attrTween("d", function (d) {
            const previous = d3.select(this).attr("d");

            // @ts-ignore: TODO: Work out how to fix this line
            const current = line(d);
            return interpolateMultiPath(previous, current);
        })
        .style("stroke", `${seriesColor}`)
        .style("stroke-width", "2px");
}
