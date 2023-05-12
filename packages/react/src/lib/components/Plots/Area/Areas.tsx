import type { IPlotsProps } from "@chart-it/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../store";

import { Area } from "./Area";
import { StackedArea } from "./StackedArea";

export interface IAreasProps extends IPlotsProps {
    /**
     * Should the area plots be stacked based on the x-value?
     */
    stacked?: boolean;
}

/**
 * Represents a set of Area Plots
 * @param  props       The set of React properties
 * @return             The Area plot component
 */
export function Areas({ ys, colors, stacked = false, ...props }: IAreasProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (stacked) {
        return <StackedArea ys={ys} colors={palette} {...props} />;
    }

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Area {...props} key={y} y={y} color={palette[i]} />
            ))}
        </React.Fragment>
    );
}

Areas.requiresVirtualCanvas = false;
Areas.isPlot = true;
Areas.brushHorizontal = true;
Areas.brushVertical = false;
