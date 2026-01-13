import React from "react";
import { useSelector } from "react-redux";

import { AutoScale, IAutoScaleProps } from "./AutoScale";
import { chartSelectors, IState } from "../../store";

export type IXScaleProps = Omit<IAutoScaleProps, "range">;

/**
 * Represents an XScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function XScale({ fields, scaleType, aggregate, domain, fromAxis = false }: IXScaleProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const range = [margin.left, width - margin.right];

    return (
        <AutoScale
            fields={fields}
            fromAxis={fromAxis}
            range={range}
            scaleType={scaleType}
            domain={domain}
            aggregate={aggregate}
        />
    );
}
