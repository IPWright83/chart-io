import type { IPlotsProps } from "@chart-it/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../store";

import { Line } from "./Line";

export type ILinesProps = Omit<IPlotsProps, "interactive">;

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
Lines.brushHorizontal = true;
Lines.brushVertical = false;
