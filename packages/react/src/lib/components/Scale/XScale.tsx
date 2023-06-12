import React from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { chartSelectors, IState } from "../../store";
import { useArray } from "../../hooks";

export type IXScaleProps = Omit<IAutoScaleProps, "range">;

/**
 * Represents an XScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function XScale({ fields, scaleType, aggregate, domain }: IXScaleProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plotMargin(s));
    const range = [plotMargin.left, width - plotMargin.right];

    const fieldsArray = useArray(fields);

    return <AutoScale fields={fieldsArray} range={range} scaleType={scaleType} domain={domain} aggregate={aggregate} />;
}
