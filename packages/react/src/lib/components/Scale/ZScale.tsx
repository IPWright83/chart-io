import React from "react";

import { AutoScale, IAutoScaleProps } from "./AutoScale";

export interface IZScaleProps extends IAutoScaleProps {}

/**
 * Represents an XScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function ZScale({ fields, scaleType, range = [5, 25], domain, fromAxis = false }: IZScaleProps) {
    return <AutoScale fields={fields} fromAxis={fromAxis} range={range} domain={domain} scaleType={scaleType} />;
}
