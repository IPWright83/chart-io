import { min, max } from "d3-array";
import { scaleBand, scalePoint, scalePow, scaleLinear, scaleTime, scaleLog } from "d3-scale";
import type { NumberValue } from "d3-scale";
import type { IScaleType, IValue, IScale, IData } from "@d3-chart/types";

import { getDataType, typeEnumToName, Type } from "@chart-it/detection";

/**
 * Return a scale as defined by the scaleType property
 * @param  scaleType    The scaletype, one of [linear, time, power, log, band, point]
 * @param  values       The set of values
 * @param  range        The physical screen space avaliable for this scale
 * @param  domain       Override the domain for the scale
 * @return              A d3.Scale function
 */
const getScaleTypeFromType = (scaleType: IScaleType, values: IValue[], range: number[], domain: IValue[]): IScale => {
    if (scaleType === "band") {
        return scaleBand() // @ts-ignore
            .domain(domain ?? values)
            .range(range)
            .paddingOuter(0.05);
    }

    if (scaleType === "point") {
        return scalePoint() // @ts-ignore
            .domain(domain ?? values)
            .range(range);
    }

    const minValue = min(values as NumberValue[]);
    const maxValue = max(values as NumberValue[]);
    const zeroOrMin = min([0, minValue]);

    switch (scaleType) {
        case "power":
            return scalePow() // @ts-ignore
                .domain(domain ?? [zeroOrMin, maxValue])
                .range(range);

        case "linear":
            return scaleLinear() // @ts-ignore
                .domain(domain ?? [zeroOrMin, maxValue])
                .range(range)
                .nice();

        case "time":
            return scaleTime() // @ts-ignore
                .domain(domain ?? [minValue, maxValue])
                .range(range);
        case "log":
            return scaleLog() // @ts-ignore
                .domain(domain ?? [zeroOrMin, maxValue])
                .range(range);
        default:
            throw new Error(`Unknown scale type: ${scaleType}`);
    }
};

/**
 * Returns the set of values to aggregate
 * @param  data          The chart data set
 * @param  fields        The fields to use for the scale
 * @param  aggregate     Should the values be aggregated?
 * @return               An array of the values
 */
const getValues = (data: IData, fields: string[], aggregate: boolean): IValue[] => {
    if (aggregate) {
        return data.map((d) =>
            fields.reduce((sum, key) => {
                const value = d[key];
                return value ? sum + +value : sum;
            }, 0)
        );
    }

    return fields.flatMap((field) => data.map((d) => d[field])).filter((v) => v !== null && v !== undefined);
};

/**
 * Obtain a Scale for the particular axis
 * @param  data        The chart data set
 * @param  fields      The fields to use for the scale
 * @param  range       The physical screen space avaliable for this scale
 * @param  domain      Override the domain for the scale
 * @param  aggregate   Should the values be aggregated?
 * @param  scaleType   Override the type of scale to use rather than determing dynamically. One of [linear, time, power, log, band, point]
 * @return             A d3.Scale function
 */
const calculateScale = (
    data: IData,
    fields: string[],
    range: number[],
    domain: IValue[],
    aggregate: boolean,
    scaleType?: IScaleType
): IScale => {
    // Grab all the values
    const values = getValues(data, fields, aggregate);

    // Use the specified scale type if provided
    if (scaleType) {
        console.debug(`Manually assigning scale ${scaleType}`, fields);
        return getScaleTypeFromType(scaleType, values, range, domain);
    }

    // Otherwise attempt to determine the types of the values
    // @ts-ignore: TODO: How do we fix this?
    const type = values.reduce((previousType, value) => getDataType(value, previousType), undefined);
    switch (type) {
        case Type.Integer:
        case Type.Double:
            console.debug(`Automatically assigning scale (linear) for data type (${typeEnumToName(type)})`, fields);
            return getScaleTypeFromType("linear", values, range, domain);

        case Type.Date:
        case Type.DateTime:
            console.debug(`Automatically assigning scale (time) for data type (${typeEnumToName(type)})`, fields);
            return getScaleTypeFromType("time", values, range, domain);

        case Type.String:
        case Type.Boolean:
            console.debug(`Automatically assigning scale (band) for data type (${typeEnumToName(type)})`, fields);
            return getScaleTypeFromType("band", values, range, domain);

        default:
            return null;
    }
};

export { calculateScale };
