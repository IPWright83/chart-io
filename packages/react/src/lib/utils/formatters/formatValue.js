import * as d3 from "d3";

import { formatNumber } from "./formatNumber";
import { formatDate } from "./formatDate";

/**
 * Formats a value for a tooltip
 * @param  {String}             name      The name of the field being formatted
 * @param  {String|Number|Date} value     The value to format
 * @return {String}                       The value formatted as a string
 */
export const formatValue = (name, value) => {
    if (value === null || value === undefined) {
        return "-";
    }

    if (typeof value === "number") {
        return formatNumber(value);
    }

    if (value instanceof Date) {
        return formatDate(value);
    }

    return `${value}`;
};
