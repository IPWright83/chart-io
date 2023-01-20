import * as d3 from "d3";

import { formatDate } from "./formatDate";

/**
 * Gets a formatting function for a tooltip
 * @param  {Function} customFormat        A custom function to format the value
 * @return {Function}                     The format function
 */
export const getFormatValue =
    (customFormat) =>
    /**
     * Formats a value for a tooltip
     * @param  {String|Number|Date} value     The value to format
     * @return {String}                       The value formatted as a string
     */
    (value) => {
        if (value === null || value === undefined) {
            return "-";
        }

        // If a custom formatter function was provided use that instead
        if (customFormat) {
            return customFormat(value);
        }

        if (typeof value === "number") {
            return d3.format(".4s")(value);
        }

        if (value instanceof Date) {
            return formatDate(value);
        }

        return `${value}`;
    };
