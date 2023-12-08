import { chartSelectors, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { useArray } from "../../hooks";

export type IYScaleProps = Omit<IAutoScaleProps, "range">;

/**
 * Represents a YScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function YScale({ fields, scaleType, aggregate, domain }: IYScaleProps) {
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));

    const range = [plotHeight + top, top];

    const fieldsArray = useArray(fields);

    return <AutoScale fields={fieldsArray} range={range} scaleType={scaleType} domain={domain} aggregate={aggregate} />;
}
