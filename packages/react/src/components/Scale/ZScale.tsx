import React from "react";
import PropTypes from "prop-types";

import { Scale, IScaleProps } from "./Scale";

export interface IZScaleProps extends Omit<IScaleProps, "aggregate"> {}

/**
 * Represents an XScale
 * @param  {Object} props   Props for the scale
 * @return {ReactDOMComponent}   A scale component
 */
export const ZScale = ({ fields, scaleType, range = [5, 25], domain, fromAxis }: IZScaleProps) => {
    return <Scale fields={fields} fromAxis={fromAxis} range={range} domain={domain} scaleType={scaleType} />;
};
