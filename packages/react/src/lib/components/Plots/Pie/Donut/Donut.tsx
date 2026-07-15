import React from "react";

import type { IPieProps } from "../Pie";
import { Pie } from "../Pie";

export type IDonutProps = IPieProps;

/**
 * Represents a Donut plot. This is a `<Pie>` with a hole in the middle, defaulting `innerRadius` to `0.6`
 * @param  props       The set of React properties
 * @return             The Donut plot component
 */
export function Donut({ innerRadius = 0.6, ...props }: IDonutProps) {
    return <Pie {...props} innerRadius={innerRadius} />;
}

Donut.requiresVirtualCanvas = true;
Donut.isPlot = true;
