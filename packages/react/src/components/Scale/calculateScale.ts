import * as d3 from "d3";
import { getDataType, typeEnumToName, Types } from "@chart-it/detection";

import type { IData, IScaleType, IScaleFunction, IPrimitive } from "../../types";

/**
 * Return a scale as defined by the scaleType property
 * @param  scaleType    The scaletype, one of [linear, time, power, log, band, point]
 * @param  values       The set of values
 * @param  range        The physical screen space avaliable for this scale
 * @param  domain       Override the domain for the scale
 * @return              A d3.Scale function
 */
const getScaleTypeFromType = <T>(
    scaleType: IScaleType,
    values: Array<IPrimitive>,
    range: [number, number],
    domain: Array<IPrimitive>
): IScaleFunction<T> => {
    if (scaleType === "band") {
        return d3
            .scaleBand()
            .domain(domain ?? values)
            .range(range)
            .paddingOuter(0.05);
    }

    if (scaleType === "point") {
        return d3
            .scalePoint()
            .domain(domain ?? values)
            .range(range);
    }

    const min = d3.min(values);
    const max = d3.max(values);
    const zeroOrMin = d3.min([0, min]);

    switch (scaleType) {
        case "power":
            return d3
                .scalePow()
                .domain(domain ?? [zeroOrMin, max])
                .range(range);
        case "linear":
            return d3
                .scaleLinear()
                .domain(domain ?? [zeroOrMin, max])
                .range(range)
                .nice();
        case "time":
            return d3
                .scaleTime()
                .domain(domain ?? [min, max])
                .range(range);
        case "log":
            return d3
                .scaleLog()
                .domain(domain ?? [zeroOrMin, max])
                .range(range);
        default:
            throw new Error(`Unknown scale type: ${scaleType}`);
    }
};

/**
 * Returns the set of values to aggregate
 * @param  data         The chart data set
 * @param  fields       The fields to use for the scale
 * @param  aggregate    Should the values be aggregated?
 * @return              An array of the values
 */
const getValues = (data: IData, fields: Array<string>, aggregate: boolean): Array<IPrimitive> => {
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
    fields: Array<string>,
    range: [number, number],
    domain: Array<IPrimitive>,
    aggregate: boolean,
    scaleType?: IScaleType
): IScaleFunction => {
    // Grab all the values
    const values = getValues(data, fields, aggregate);

    // Use the specified scale type if provided
    if (scaleType) {
        console.debug(`Manually assigning scale ${scaleType}`, fields);
        return getScaleTypeFromType(scaleType, values, range, domain);
    }

    // Otherwise attempt to determine the types of the values
    const type = values.reduce((previousType, value) => getDataType(value, previousType), undefined);
    switch (type) {
        case Types.Integer:
        case Types.Double:
            console.debug(`Automatically assigning scale (linear) for data type (${typeEnumToName(type)})`, fields);
            return getScaleTypeFromType<number>("linear", values, range, domain);

        case Types.Date:
        case Types.DateTime:
            console.debug(`Automatically assigning scale (time) for data type (${typeEnumToName(type)})`, fields);
            return getScaleTypeFromType<Date>("time", values, range, domain);

        case Types.String:
        case Types.Boolean:
            console.debug(`Automatically assigning scale (band) for data type (${typeEnumToName(type)})`, fields);
            return getScaleTypeFromType<string>("band", values, range, domain);

        default:
            return null;
    }
};

export { calculateScale };
