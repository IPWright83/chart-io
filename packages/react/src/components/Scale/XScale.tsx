import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IStore } from "../../store";
import { Scale, IScaleProps } from "./Scale";

export interface IXScaleProps extends Omit<IScaleProps, "range"> {}

/**
 * Represents an XScale
 * @param  props   Props for the scale
 * @return         A scale component
 */
export const XScale = ({ fields, scaleType, aggregate, domain, fromAxis }: IXScaleProps) => {
    const width = useSelector((s: IStore) => chartSelectors.dimensions.width(s));
    const margin = useSelector((s: IStore) => chartSelectors.dimensions.margin(s));
    const range = [margin.left, width - margin.right];

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
