import React from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { chartSelectors, IState } from "../../store";
import { useArray } from "../../hooks";

export type IYScaleProps = Omit<IAutoScaleProps, "range">;

/**
 * Represents a YScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function YScale({ fields, scaleType, aggregate, domain }: IYScaleProps) {
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const range = [height - margin.bottom, margin.top];

    const fieldsArray = useArray(fields);

    return <AutoScale fields={fieldsArray} range={range} scaleType={scaleType} domain={domain} aggregate={aggregate} />;
}
