import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../store";
import { AutoScale, IAutoScaleProps } from "./AutoScale";

export interface IYScaleProps extends Omit<IAutoScaleProps, "range"> {}

/**
 * Represents a YScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export function YScale({ fields, scaleType, aggregate, domain, fromAxis = false }: IYScaleProps) {
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const range = [height - margin.bottom, margin.top];

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
