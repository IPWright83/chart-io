import "./Axis.css";

import * as d3 from "d3";

import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { getD3Axis } from "./getD3Axis";
import { getTransform } from "./getTransform";
import { Gridlines } from "./Gridlines";
import { Title } from "./Title";

import { IPosition } from "../../../types";

import { chartSelectors } from "../../../store";

export interface IAxis {
    position: IPosition;
    fields: string[];
    tickSizeInner: number;
    tickSizeOuter: number;
    tickPadding: number;
    showGridlines: boolean;
    title?: string;
    tickFormat?: Function;
    ticks: any[];
}

/**
 * Represents an Axis component
 * @return The Axis component
 */
const Axis = ({
    position,
    fields,
    tickSizeInner = 6,
    tickSizeOuter = 6,
    tickPadding = 3,
    ticks,
    showGridlines = true,
    title,
    tickFormat,
}: IAxis) => {
    if (fields.length === 0) {
        throw new Error(
            "Unable to render an Axis without a field. Ensure that you have provided at least one field in the 'fields' prop.",
        );
    }

    const field = fields[0];
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const scale = useSelector((s) => chartSelectors.scales.getScale(s, field));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));
    const transform = getTransform(position, width, height, margin);

    // React will own the axis containers, but D3 will own the axis themselves
    const axis = useRef(null);

    // Render the x-axis using D3
    useEffect(() => {
        if (axis.current && scale) {
            const selection = d3.select(axis.current).transition().duration(animationDuration);

            // Create the D3 axis renderer
            const d3Axis = getD3Axis(position, scale);

            // Set some scale props
            d3Axis
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(tickSizeOuter)
                .tickPadding(tickPadding)
                .tickFormat(tickFormat)
                .ticks(ticks);

            // Render the axis
            selection.call(d3Axis);
        }
    }, [position, axis, scale, animationDuration, tickPadding, tickSizeInner, tickSizeOuter, showGridlines]);

    return (
        <React.Fragment>
            <Title position={position} title={title} fields={fields} />
            <g transform={transform}>
                {showGridlines ? <Gridlines position={position} scale={scale} ticks={ticks} /> : null}
                <g className={`axis-${position}`} ref={axis} />
            </g>
        </React.Fragment>
    );
};

export { Axis };
