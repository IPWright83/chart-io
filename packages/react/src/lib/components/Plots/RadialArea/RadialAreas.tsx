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
    /**
     * Should each series' area be filled? See `<RadialArea>`'s own `filled` prop - useful here in
     * particular, since a filled series in front will hide a filled series behind it wherever the
     * front series' values are greater at every angle, regardless of z-order or opacity
     * @default true
     */
    filled?: boolean;
    /**
     * The opacity of each series' filled area, when `filled` is true. See `<RadialArea>`'s own
     * `fillOpacity` prop
     * @default the theme's series opacity
     */
    fillOpacity?: number;
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

// See RadialArea.tsx - each series draws directly to the real canvas and uses global mouse
// position for hover, so none of them need the virtual canvas
RadialAreas.requiresVirtualCanvas = false;
RadialAreas.isPlot = true;
