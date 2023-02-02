import type { IPosition, IScale } from "@d3-chart/types";
import * as d3 from "d3";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getTickSize } from "./getTickSize";
import { getD3Axis } from "../getD3Axis";

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
}

/**
 * Represents a Gridlines component
 * @return The Gridlines component
 */
export function Gridlines({ layer, position, scale, tickPadding = 3, ticks, tickValues }: IGridlinesProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const tickSize = getTickSize(position, width, height, margin);

    // Move this CSS into code
    // .g-gridlines .domain {
    //     display: none;
    //     user-select: none;
    // }

    // .g-gridlines.left .tick:first-of-type {
    //     display: none;
    // }

    // .g-gridlines.bottom .tick:first-of-type {
    //     display: none;
    // }

    // .g-gridlines.right .tick:last-of-type {
    //     display: none;
    // }

    // .g-gridlines.top .tick:last-of-type {
    //     display: none;
    // }

    // Render the x-axis using D3
    useEffect(() => {
        if (layer.current && scale) {
            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position, scale);

            // Set some scale props
            d3Axis
                .scale(scale as d3.AxisScale<d3.AxisDomain>)
                .tickPadding(tickPadding)
                .tickValues(tickValues);

            d3.select(layer.current)
                .attr("class", `g-gridlines ${position}`)
                .style("color", theme.gridlines.stroke)
                .style("stroke-opacity", theme.gridlines.strokeOpacity)
                .style("stroke-width", theme.gridlines.strokeWidth)
                .style("pointer-events", "none")
                .transition()
                .duration(animationDuration)
                .call(
                    d3Axis
                        .tickSize(-tickSize)
                        .ticks(ticks) // @ts-ignore
                        .tickFormat("")
                );
        }
    }, [position, scale, animationDuration, tickPadding]);

    return null;
}
