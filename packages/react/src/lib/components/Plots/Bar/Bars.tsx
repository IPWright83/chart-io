import type { IPlotsProps } from "@d3-chart/types";

import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../store";

import { Bar } from "./Bar";
import { GroupedBar } from "./GroupedBar";
import { StackedBar } from "./StackedBar";

export interface IBarsProps extends Omit<IPlotsProps, "ys" | "x"> {
    /**
     * The set of x fields to use to access the data for each plot
     */
    xs: Array<string>;
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
export function Bars({ xs, colors, stacked = false, grouped = false, ...props }: IBarsProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (stacked && grouped) {
        throw new Error("Bar plots currently do not support both being stacked and grouped");
    }

    if (!stacked && !grouped) {
        throw new Error("Multiple bars plots must be either stacked or grouped");
    }

    if (stacked) {
        return <StackedBar xs={xs} colors={palette} {...props} />;
    }

    if (grouped) {
        return <GroupedBar xs={xs} colors={palette} {...props} />;
    }

    return (
        <React.Fragment>
            {xs.map((x, i) => (
                <Bar {...props} key={x} x={x} color={palette[i]} />
            ))}
        </React.Fragment>
    );
}

Bars.requiresVirtualCanvas = true;
