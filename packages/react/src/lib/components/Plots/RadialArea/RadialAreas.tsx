import { chartSelectors, IState } from "@chart-io/core";
import type { IPlotsProps } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { RadialArea } from "./RadialArea";

export interface IRadialAreasProps extends IPlotsProps {
    /**
     * Should the area be drawn as a closed loop, joining the last point back to the first? See
     * `<RadialArea>`'s own `closed` prop
     * @default false
     */
    closed?: boolean;
}

/**
 * Represents a set of RadialArea plots, one per field in `ys`, sharing the same angular (`x`) scale
 * @param  props       The set of React properties
 * @return             The RadialAreas plot component
 */
export function RadialAreas({ ys, colors, ...props }: IRadialAreasProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <RadialArea {...props} key={y} y={y} color={palette[i % palette.length]} />
            ))}
        </React.Fragment>
    );
}

RadialAreas.requiresVirtualCanvas = false;
RadialAreas.isPlot = true;
