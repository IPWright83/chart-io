import { chartSelectors, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { useArray } from "../../hooks";

export type IXScaleProps = Omit<IAutoScaleProps, "range">;

/**
 * Represents an XScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function XScale({ fields, scaleType, aggregate, domain }: IXScaleProps) {
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const range = [left, left + plotWidth];

    const fieldsArray = useArray(fields);

    return <AutoScale fields={fieldsArray} range={range} scaleType={scaleType} domain={domain} aggregate={aggregate} />;
}
