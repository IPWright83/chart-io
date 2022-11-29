import "./gridlines.css";

import * as d3 from "d3";

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getTickSize } from "./getTickSize";
import { getD3Axis } from "../getD3Axis";

import { chartSelectors } from "../../../../store";
import type { Position } from "../../../../types";

export interface GridlinesProps {
    /**
     * The position of the axis [top, bottom, left, right]
     */
    position: Position;
    /**
     * The D3 scale object used for the axis
     */
    scale: d3.AxisScale<d3.AxisDomain>;
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
export function Gridlines({ layer, position, scale, tickPadding = 3, ticks }: GridlinesProps) {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const tickSize = getTickSize(position, width, height, margin);

    // Render the x-axis using D3
    useEffect(() => {
        if (layer.current && scale) {
            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position, scale);

            // Set some scale props
            d3Axis.scale(scale).tickPadding(tickPadding).tickSize();

            d3.select(layer.current)
                .attr("class", `g-gridlines ${position}`)
                .style("color", theme.gridlines.stroke)
                .style("stroke-opacity", theme.gridlines.strokeOpacity)
                .style("stroke-width", theme.gridlines.strokeWidth)
                .transition()
                .duration(animationDuration)
                .call(d3Axis.tickSize(-tickSize).ticks(ticks).tickFormat(""));
        }
    }, [position, scale, animationDuration, tickPadding]);

    return null;
}
