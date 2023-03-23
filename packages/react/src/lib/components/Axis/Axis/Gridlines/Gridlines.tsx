import * as d3 from "@d3-chart/d3";
import type { AxisDomain, AxisScale } from "@d3-chart/d3";
import type { IPosition, IScale } from "@d3-chart/types";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getD3Axis } from "../getD3Axis";
import { getTickSize } from "./getTickSize";

import { chartSelectors, IState } from "../../../../store";

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
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const tickSize = getTickSize(position, width, height, margin);

    // Render the x-axis using D3
    useEffect(() => {
        if (layer.current && scale) {
            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position, scale);

            // Set some scale props
            d3Axis
                .scale(scale as AxisScale<AxisDomain>)
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
                        .ticks(ticks) // @ts-ignore: TODO: See if we can fix this
                        .tickFormat("")
                );

            // Remove parts that would otherwise overlap the axis
            d3.select(layer.current).select(".domain").remove();
        }
    }, [position, scale, animationDuration, tickPadding]);

    return null;
}
