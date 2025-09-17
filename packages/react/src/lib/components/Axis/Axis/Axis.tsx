import { chartSelectors, d3, IState, logAndThrowError } from "@chart-io/core";
import type { IPosition } from "@chart-io/types";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useArray } from "../../../hooks";

import { getD3Axis } from "./getD3Axis";
import { getTransform } from "./getTransform";
import { Gridlines } from "./Gridlines";
import { Title } from "./Title";

export interface IAxisProps {
    /**
     * The position of the axis [top, bottom, left, right]
     */
    position: IPosition;
    /**
     * The key(s) of the fields that will share this scale
     */
    fields: string | Array<string>;
    /**
     * https://github.com/d3/d3-axis#axis_tickSizeInner
     */
    tickSizeInner?: number;
    /**
     * https://github.com/d3/d3-axis#axis_tickSizeOuter
     */
    tickSizeOuter?: number;
    /**
     * https://github.com/d3/d3-axis#axis_tickPadding
     */
    tickPadding?: number;
    /**
     * Should gridlines be drawn?
     */
    showGridlines?: boolean;
    /**
     * A title for the Axis
     */
    title?: string;
    /**
     * https://github.com/d3/d3-axis#axis_tickFormat
     */
    tickFormat?: (domainValue: any, index: number) => string;
    /**
     * https://github.com/d3/d3-axis#axis_ticks
     */
    ticks?: any[];
    /**
     * https://github.com/d3/d3-axis#axis_tickValues
     */
    tickValues?: string[] | number[] | Date[];
}

/**
 * Represents an Axis component
 * @return The Axis component
 */
export function Axis({
    position,
    fields,
    tickSizeInner = 6,
    tickSizeOuter = 6,
    tickPadding = 3,
    ticks,
    showGridlines = true,
    title,
    tickFormat,
    tickValues,
}: IAxisProps) {
    const fieldsArray = useArray(fields);

    if (fieldsArray.length === 0) {
        // prettier-ignore
        logAndThrowError("E005", "Unable to render an Axis without a field. Ensure that you have provided at least one field in the 'fields' prop");
    }

    const field = fieldsArray[0];
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plot.margin(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, field, "plot"));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const transform = getTransform(position, plotWidth, plotHeight, plotMargin);

    // React will own the axis containers, but D3 will own the axis themselves
    const axis = useRef(null);

    // Render the x-axis using D3
    useEffect(() => {
        if (axis.current && scale && scale.domain().length > 0 && scale.range().length > 0) {
            const selection = d3
                .select(axis.current)
                .style("color", `${theme.axis.stroke}`)
                .style("stroke-opacity", theme.axis.strokeOpacity)
                .style("stroke-width", theme.axis.strokeWidth)
                .transition()
                .duration(animationDuration);

            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position, scale);

            // Set some scale props
            d3Axis
                .scale(scale as d3.AxisScale<d3.AxisDomain>)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(tickSizeOuter)
                .tickPadding(tickPadding)
                .tickFormat(tickFormat)
                .tickValues(tickValues)
                .ticks(ticks);

            // Render the axis
            selection.call(d3Axis);
        }
    }, [position, axis, scale, animationDuration, tickPadding, tickSizeInner, tickSizeOuter, showGridlines]);

    return (
        <React.Fragment>
            <Title position={position} title={title} />
            <g transform={transform}>
                {showGridlines ? (
                    <Gridlines position={position} scale={scale} ticks={ticks} tickValues={tickValues} />
                ) : null}
                <g className={`chart-io axis axis-${position}`} ref={axis} style={{ userSelect: "none" }} />
            </g>
        </React.Fragment>
    );
}
