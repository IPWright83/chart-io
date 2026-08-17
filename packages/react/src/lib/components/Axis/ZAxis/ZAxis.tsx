import type { IScaleType, IValue } from "@chart-io/core";

import React from "react";

import { useArray, useSizeLegend } from "../../../hooks";
import { ZScale } from "../../Scale";

export interface IZAxisProps {
    /**
     * The key of the field used to build the z (size) scale - pass the same field to a
     * `<Scatter z>`/`<Scatters z>` so its circles are sized against this legend
     */
    fields: string | Array<string>;
    /**
     * (Optional) An override of the domain to use with the d3 scale
     */
    domain?: IValue[];
    /**
     * (Optional) An override of the type of d3 scale to use
     */
    scaleType?: IScaleType;
    /**
     * (Optional) An override of the pixel radius range the scale maps values onto. Keep this in
     * sync with any other `<ZAxis>`/`<ZScale>` sharing the field, so the legend's circles are drawn
     * at the same size as the series' circles they describe
     * @default [5, 25]
     */
    range?: number[];
    /**
     * The number of concentric circles to draw in the legend, each a representative value picked
     * from the scale's domain (e.g. a low/mid/high spread). Ignored when `tickValues` is provided
     * @default 3
     */
    ticks?: number;
    /**
     * (Optional) Explicit values to draw a circle for in the legend, instead of letting `ticks` pick
     * them automatically
     */
    tickValues?: IValue[];
    /**
     * A function to format each circle's value label in the legend
     * @default (value) => `${value}`
     */
    tickFormat?: (value: IValue) => string;
}

/**
 * Represents a ZAxis, building the size (z) scale a `<Scatter z>`/`<Scatters z>` sizes its circles
 * from, and registering a legend explaining it - a nested-circle diagram drawn at the bottom of the
 * chart's `<Legend>`, in the style of a New York Times bubble-size legend
 * @return The ZAxis component
 */
export function ZAxis({
    fields,
    domain,
    scaleType,
    range = [5, 25],
    ticks = 3,
    tickValues,
    tickFormat,
}: IZAxisProps) {
    const fieldsArray = useArray(fields);
    const field = fieldsArray[0];

    useSizeLegend(field, ticks, tickValues, tickFormat);

    return <ZScale fields={fieldsArray} scaleType={scaleType} range={range} domain={domain} />;
}
