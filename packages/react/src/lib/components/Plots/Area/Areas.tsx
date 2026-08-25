import { chartSelectors, IState } from "@chart-io/core";
import type { IPlotsProps } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { Area } from "./Area";
import { StackedArea } from "./StackedArea";
import { IStackOffset, IStackOrder } from "./StackedArea/StackedAreaBase";

export interface IAreasProps extends IPlotsProps {
    /**
     * Should the area plots be stacked based on the x-value?
     */
    stacked?: boolean;

    /**
     * How the stack's layers should be offset from the baseline. Only applies when `stacked` is
     * true - e.g. `offset="wiggle"` produces a streamgraph
     * @default "none"
     */
    offset?: IStackOffset;

    /**
     * The order in which the stack's layers should be arranged. Only applies when `stacked` is true
     * @default "none"
     */
    order?: IStackOrder;
}

/**
 * Represents a set of Area Plots
 * @param  props       The set of React properties
 * @return             The Area plot component
 */
export function Areas({ ys, colors, stacked = false, offset, order, ...props }: IAreasProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (stacked) {
        return <StackedArea ys={ys} colors={palette} offset={offset} order={order} {...props} />;
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
Areas.brush = {
    horizontal: true,
    vertical: false,
};
Areas.zoom = {
    horizontal: true,
    vertical: false,
};
