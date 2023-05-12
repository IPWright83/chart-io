import type { IPlotsProps } from "@chart-it/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../store";

import { Scatter } from "./Scatter";

export interface IScattersProps extends Omit<IPlotsProps, "interactive"> {
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
Scatters.brushHorizontal = true;
Scatters.brushVertical = true;
