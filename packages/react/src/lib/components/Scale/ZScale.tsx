import React from "react";

import { AutoScale, IAutoScaleProps } from "./AutoScale";

import { useArray } from "../../hooks";

export type IZScaleProps = IAutoScaleProps;

/**
 * Represents an XScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function ZScale({ fields, scaleType, range = [5, 25], domain, fromAxis = false }: IZScaleProps) {
    const fieldsArray = useArray(fields);

    return <AutoScale fields={fieldsArray} fromAxis={fromAxis} range={range} domain={domain} scaleType={scaleType} />;
}
