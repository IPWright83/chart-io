import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IPosition, IScale } from "@chart-io/core";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getD3Axis } from "../getD3Axis";
import { getTickSize } from "./getTickSize";

export interface IGridlinesBaseProps {
    /**
     * The position of the axis [top, bottom, left, right]
     */
    position: IPosition;
    /**
     * The D3 scale object used for the axis
     */
    scale: IScale;
    /**
     * Internal parameter - the SVG useRef layer
     */
    layer: any;
    /**
     * https://github.com/d3/d3-axis#axis_ticks
     */
    ticks: any;
    /**
     * https://github.com/d3/d3-axis#axis_tickPadding
     */
    tickPadding: number;
    /**
     * https://github.com/d3/d3-axis#axis_tickValues
     */
    tickValues?: string[];
}

/**
 * Represents a Gridlines component
 * @return The Gridlines component
 */
export function Gridlines({ layer, position, scale, tickPadding = 3, ticks, tickValues }: IGridlinesBaseProps) {
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const tickSize = getTickSize(position, plotWidth, plotHeight);

    // Render the x-axis using D3
    useEffect(() => {
        if (layer.current && scale && scale.domain().length > 0 && scale.range().length > 0) {
            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position, scale);

            // Set some scale props
            d3Axis
                .scale(scale as d3.AxisScale<d3.AxisDomain>)
                .tickPadding(tickPadding)
                .tickValues(tickValues);

            d3.select(layer.current)
                .attr("class", `g-gridlines ${position}`)
                .style("color", theme.gridlines.stroke?.toString())
                .style("stroke-opacity", theme.gridlines.strokeOpacity)
                .style("stroke-width", theme.gridlines.strokeWidth)
                .style("pointer-events", "none")
                .transition()
                .duration(animationDuration)
                .call(
                    d3Axis
                        .tickSize(-tickSize)
                        .ticks(ticks)
                        .tickFormat(() => null),
                );

            // Remove parts that would otherwise overlap the axis
            d3.select(layer.current).select(".domain").remove();
        }
    }, [position, scale, animationDuration, tickPadding]);

    return null;
}
