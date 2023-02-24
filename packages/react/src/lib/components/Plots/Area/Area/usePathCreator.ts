import { select } from "d3-selection";
import { area as d3area, curveLinear } from "d3-shape";
import type { IScale } from "@d3-chart/types";
import { useEffect } from "react";

/**
 * Creates an SVG path in the DOM positioned at the bottom of the Axis
 * so we can animate smoothly from 0
 * @param  layer      The layer we're updating to from a React useRef
 * @param  x          The key of the field used for the x position
 * @param  y          The key of the field used for the y position
 * @param  xScale     The d3 scale for the x axis
 * @param  yScale     The d3 scale for the y axis
 * @param  canvas     If a canvas is provided this will supress the path creator in a React hook safe way
 */
export function usePathCreator(
    layer: React.MutableRefObject<Element>,
    x: string,
    y: string,
    xScale: IScale,
    yScale: IScale,
    canvas: HTMLCanvasElement
) {
    useEffect(() => {
        // Ensure that we've got the SVG group to render to
        // If a canvas is provided this will supress the path creator in a React hook safe way
        if (!layer.current || canvas) {
            return;
        }

        const current = layer.current;

        // Cleanup the DOM if the scales have been removed as we
        // have no idea where to draw a line
        if (!xScale || !yScale) {
            select(current).selectAll("*").remove();
            return;
        }

        // @ts-expect-error: This is a runtime check
        const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0;

        const area = d3area()
            .curve(curveLinear)
            .x((d) => xScale(d[x]) + bandwidth)
            .y0(() => yScale.range()[0])
            .y1((d) => yScale(d[y]));

        // Only ever add the path once on first render when
        // we've got the minimum bits required
        select(current)
            .append("path")
            .datum([
                { [x]: xScale.domain()[0], [y]: yScale.domain()[0] },
                { [x]: xScale.domain()[xScale.domain().length - 1], [y]: yScale.domain()[0] },
            ])
            .attr("class", "area")
            // @ts-ignore: TODO: Not sure how to fix this
            .attr("d", area);

        // Do not include the scales in here. While they need
        // to be used for the first render, we never want to
        // update this line even if the scales change.
        //
        // The fact that the plot is called via an withXYPlot provides
        // enough safety around the scales being null on first render
    }, [layer, x, y, xScale, yScale]);
}
