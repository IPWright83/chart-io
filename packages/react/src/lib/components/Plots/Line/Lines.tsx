import { chartSelectors, IState } from "@chart-io/core";
import type { IPlotsProps } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { Line } from "./Line";

export type ILinesProps = IPlotsProps;

/**
 * Represents a set of Line Plots
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
export function Lines({ ys, colors, ...props }: ILinesProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Line {...props} key={y} y={y} color={palette[i]} />
            ))}
        </React.Fragment>
    );
}

Lines.requiresVirtualCanvas = false;
Lines.isPlot = true;
Lines.brush = {
    horizontal: true,
    vertical: false,
};
Lines.zoom = {
    horizontal: true,
    vertical: false,
};
