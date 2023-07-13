import * as d3 from "@chart-io/d3";
import type { IScale } from "@chart-io/types";
import { useEffect } from "react";

/**
 * Creates an SVG path in the DOM positioned at the bottom of the Axis
 * so we can animate smoothly from 0
 * @param  layer      The layer we're updating to from a React useRef
 * @param  x          The key of the field used for the x position
 * @param  y          The key of the field used for the y position
 * @param  xScale     The d3 scale for the x axis
 * @param  yScale     The d3 scale for the y axis
 */
export function usePathCreator(
    layer: React.MutableRefObject<Element>,
    x: string,
    y: string,
    xScale: IScale,
    yScale: IScale
) {
    useEffect(() => {
        // Ensure that we've got the SVG group to render to
        if (!layer.current) {
            return;
        }

        // Cleanup the DOM if the scales have been removed as we
        // have no idea where to draw a line
        if (!xScale || !yScale) {
            d3.select(layer.current).selectAll("*").remove();
            return;
        }

        const current = layer.current;
        const line = d3
            .line()
            .x((d) => xScale(d[x]) + bandwidth)
            .y((d) => yScale(d[y]));

        // @ts-expect-error: We handle a missing bandwidth fine
        const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0;

        // Only ever add the path once on first render when
        // we've got the minimum bits required
        d3.select(current)
            .append("path")
            .datum([
                { [x]: xScale.domain()[0], [y]: yScale.domain()[0] },
                { [x]: xScale.domain()[xScale.domain().length - 1], [y]: yScale.domain()[0] },
            ])
            .attr("class", "line")
            .style("fill", "none")
            .style("pointer-events", "none")
            // @ts-ignore: TODO: Fix this
            .attr("d", line);

        // Do not include the scales in here. While they need
        // to be used for the first render, we never want to
        // update this line even if the scales change.
        //
        // The fact that the plot is called via an withXYPlot provides
        // enough safety around the scales being null on first render
    }, [layer, x, y]);
}
