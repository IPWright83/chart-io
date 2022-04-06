import * as d3 from "d3";

import { getDataType, typeEnumToName, Types } from "../../detection";

/**
 * Return a scale as defined by the scaleType property
 * @param  {String} scaleType   The scaletype, one of [linear, time, power, log, band, point]
 * @param  {Any[]} values       The set of values
 * @param  {Number[]}  range    The physical screen space avaliable for this scale
 * @param  {Array} domain       Override the domain for the scale
 * @return {d3.Scale}           A d3.Scale function
 */
const getScaleTypeFromType = (scaleType, values, range, domain) => {
    if (scaleType === "band") {
        return d3
            .scaleBand()
            .domain(domain ?? values)
            .range(range);
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
 * @param  {Object[]}  data        The chart data set
 * @param  {String[]} fields       The fields to use for the scale
 * @param  {Boolean} aggregate     Should the values be aggregated?
 * @return {Array}                 An array of the values
 */
const getValues = (data, fields, aggregate) => {
    if (aggregate) {
        return data.map((d) =>
            fields.reduce((sum, key) => {
                const value = d[key];
                return value ? sum + value : sum;
            }, 0),
        );
    }

    return fields.flatMap((field) => data.map((d) => d[field])).filter((v) => v !== null && v !== undefined);
};

/**
 * Obtain a Scale for the particular axis
 * @param  {Object[]}  data        The chart data set
 * @param  {String[]} fields       The fields to use for the scale
 * @param  {Number[]}  range       The physical screen space avaliable for this scale
 * @param  {Array} domain          Override the domain for the scale
 * @param  {Boolean} aggregate     Should the values be aggregated?
 * @param  {String} scaleType      Override the type of scale to use rather than determing dynamically. One of [linear, time, power, log, band, point]
 * @return {d3.Scale}              A d3.Scale function
 */
const calculateScale = (data, fields, range, domain, aggregate, scaleType) => {
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
            return getScaleTypeFromType("linear", values, range, domain);

        case Types.Date:
        case Types.DateTime:
            console.debug(`Automatically assigning scale (time) for data type (${typeEnumToName(type)})`, fields);
            return getScaleTypeFromType("time", values, range, domain);

        case Types.String:
        case Types.Boolean:
            console.debug(`Automatically assigning scale (band) for data type (${typeEnumToName(type)})`, fields);
            return getScaleTypeFromType("band", values, range, domain);

        default:
            return null;
    }
};

export { calculateScale };
