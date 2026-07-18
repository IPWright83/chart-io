import React from "react";

import type { IDonutProps } from "../Donut";
import { Donut } from "../Donut";

export type IPieProps = Omit<IDonutProps, "innerRadius">;

/**
 * Represents a Pie plot. This is a `<Donut>` with no hole in the middle, so unlike `<Donut>` it doesn't
 * accept an `innerRadius` - a Pie segment, by definition, always reaches the center
 * @param  props       The set of React properties
 * @return             The Pie plot component
 */
export function Pie(props: IPieProps) {
    return <Donut {...props} innerRadius={0} />;
}

Pie.requiresVirtualCanvas = true;
Pie.isPlot = true;
