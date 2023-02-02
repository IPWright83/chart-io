import type { IPlotsProps } from "@d3-chart/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../store";

import { Scatter } from "./Scatter";

export interface IScattersProps extends Omit<IPlotsProps, "interactive"> {}

/**
 * Represents a set of Scatter Plots
 * @param  props       The set of React properties
 * @return             The Scatter plot component
 */
export function Scatters({ x, ys, colors, ...props }: IScattersProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Scatter {...props} key={y} y={y} x={x} color={palette[i]} />
            ))}
        </React.Fragment>
    );
}

Scatters.requiresVirtualCanvas = true;
