import { chartSelectors, IState, logAndThrowError } from "@chart-io/core";
import type { IPlotsProps } from "@chart-io/types";

import React from "react";
import { useSelector } from "react-redux";

import { Bar } from "./Bar";
import { GroupedBar } from "./GroupedBar";
import { StackedBar } from "./StackedBar";

export interface IBarsProps extends Omit<IPlotsProps, "ys" | "x"> {
    /**
     * The set of x fields to use to access the data for each plot
     */
    xs: Array<string>;
    /**
     * The y field to use to access the data for each plot
     */
    y: string;
    /**
     * Should the column plots be stacked based on the x-value?
     */
    stacked?: boolean;
    /**
     * Should the column plots be grouped based on the x-value?
     */
    grouped?: boolean;
}

/**
 * Represents a set of Bar Plots
 * @param  props       The set of React properties
 * @return             The Bar plot component
 */
export function Bars({ y, xs, colors, stacked = false, grouped = false, ...props }: IBarsProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (stacked && grouped) {
        logAndThrowError("E003", "Bar plots do not support both being stacked and grouped");
    }

    if (!stacked && !grouped) {
        logAndThrowError("E004", "Multiple Bar plots must be either stacked or grouped");
    }

    if (stacked) {
        return <StackedBar y={y} xs={xs} colors={palette} {...props} />;
    }

    if (grouped) {
        return <GroupedBar y={y} xs={xs} colors={palette} {...props} />;
    }

    return (
        <React.Fragment>
            {xs.map((x, i) => (
                <Bar {...props} key={x} x={x} y={y} color={palette[i]} />
            ))}
        </React.Fragment>
    );
}

Bars.requiresVirtualCanvas = true;
Bars.isPlot = true;
Bars.brush = {
    horizontal: false,
    vertical: true,
};
Bars.zoom = {
    horizontal: false,
    vertical: true,
};
