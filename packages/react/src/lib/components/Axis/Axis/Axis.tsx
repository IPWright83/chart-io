import * as d3 from "@chart-it/d3";
import type { AxisDomain, AxisScale } from "@chart-it/d3";
import type { IPosition } from "@chart-it/types";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../store";
import { useArray } from "../../../hooks";

import { getD3Axis } from "./getD3Axis";
import { getTransform } from "./getTransform";
import { Gridlines } from "./Gridlines";
import { logAndThrowError } from "../../../utils";
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
    // @ts-ignore: TODO: Need to improve this typing
    // eslint-disable-next-line @typescript-eslint/ban-types
    tickFormat?: Function;
    /**
     * https://github.com/d3/d3-axis#axis_ticks
     */
    ticks?: any[];
    /**
     * https://github.com/d3/d3-axis#axis_tickValues
     */
    tickValues?: string[];
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
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getAxisScale(s, field));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const transform = getTransform(position, width, height, margin);

    // React will own the axis containers, but D3 will own the axis themselves
    const axis = useRef(null);

    // Render the x-axis using D3
    useEffect(() => {
        if (axis.current && scale) {
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
                .scale(scale as AxisScale<AxisDomain>)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(tickSizeOuter)
                .tickPadding(tickPadding)
                // @ts-ignore: TODO: Work out how to fix this
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
                <g className={`chart-it axis axis-${position}`} ref={axis} style={{ userSelect: "none" }} />
            </g>
        </React.Fragment>
    );
}
