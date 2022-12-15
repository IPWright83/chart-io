import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IStore } from "../../store";
import { Scale, IScaleProps } from "./Scale";

export interface IYScaleProps extends Omit<IScaleProps, "range"> {}

/**
 * Represents a YScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export const YScale = ({ fields, scaleType, aggregate, domain, fromAxis }: IYScaleProps) => {
    const height = useSelector((s: IStore) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s: IStore) => chartSelectors.dimensions.margin(s));
    const range = [height - margin.bottom, margin.top];

    return (
        <Scale
            fields={fields}
            fromAxis={fromAxis}
            range={range}
            scaleType={scaleType}
            domain={domain}
            aggregate={aggregate}
        />
    );
};
