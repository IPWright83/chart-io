import * as d3 from "d3";
import { useEffect } from "react";

/**
 * Creates an SVG path in the DOM positioned at the bottom of the Axis
 * so we can animate smoothly from 0
 * @param  {Object} layer                The layer we're updating to from a React useRef
 * @param  {String} x                    The key of the field used for the x position
 * @param  {Array} ys                    The keys of the fields used for the y positions
 * @param  {d3.Scale} xScale             The d3 scale for the x axis
 * @param  {d3.Scale} yScale             The d3 scale for the y axis
 * @param  {Object} canvas     If a canvas is provided this will supress the path creator in a React hook safe way
 */
const useMultiPathCreator = (layer, x, ys, xScale, yScale, canvas) => {
    useEffect(() => {
        // Ensure that we've got the SVG group to render to
        if (!layer.current || canvas) {
            return;
        }

        const current = layer.current;

        // Cleanup the DOM if the scales have been removed as we
        // have no idea where to draw a line
        if (!xScale || !yScale) {
            d3.select(current).selectAll("*").remove();
            return;
        }

        const area = d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => xScale(d.data[x]))
            .y0((d) => yScale(d[0]))
            .y1((d) => yScale(d[1]));

        const ZeroedData = ys.reduce(
            (data, y) => {
                return [
                    { ...data[0], [y]: yScale.domain()[0] },
                    { ...data[1], [y]: yScale.domain()[0] },
                ];
            },
            [{ [x]: xScale.domain()[0] }, { [x]: xScale.domain()[1] }]
        );

        const stackedData = d3.stack().keys(ys)(ZeroedData);

        // Only ever add the path once on first render when
        // we've got the minimum bits required
        const join = d3.select(current).selectAll("path").data(stackedData);

        // Clean up old paths
        join.exit().remove();

        join.enter()
            .append("path")
            .datum((d) => d)
            .attr("class", "area")
            .attr("d", area);
    }, [layer, x, ys, xScale, yScale]);
};

export { useMultiPathCreator };
