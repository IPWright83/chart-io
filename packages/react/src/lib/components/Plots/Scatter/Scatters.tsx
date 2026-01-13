import { chartSelectors, IState } from "@chart-io/core";
import type { IPlotsProps } from "@chart-io/types";

import React from "react";
import { useSelector } from "react-redux";

import { Scatter } from "./Scatter";

export interface IScattersProps extends IPlotsProps {
    /**
     * The fixed radius to use for points. This is ignored if z is provided
     */
    radius?: number;
}

/**
 * Represents a set of Scatter Plots
 * @param  props       The set of React properties
 * @return             The Scatter plot component
 */
export function Scatters({ x, ys, radius, colors, ...props }: IScattersProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Scatter {...props} key={y} y={y} x={x} radius={radius} color={palette[i]} />
            ))}
        </React.Fragment>
    );
}

Scatters.requiresVirtualCanvas = true;
Scatters.isPlot = true;
Scatters.brush = {
    horizontal: true,
    vertical: true,
};
Scatters.zoom = {
    horizontal: true,
    vertical: true,
};
