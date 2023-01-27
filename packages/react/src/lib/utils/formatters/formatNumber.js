import * as d3 from "d3";

const SIGNIFICANT_FIGURES = 4;
const REGEX_REPLACE_ZEROS_AFTER_DECIMAL = /(.*)(\.0+)([^\d]*)$/;

/**
 * Formats a Number, defaulting the significant figures resolution to the first non-zero part
 * @param  {Number} value     The number to format
 * @return {String}         The number formatted as a string
 */
export const formatNumber = (value) => {
    if (value > 1) {
        // Replace any 0's after the decimal point to swap strings like 100.00k to 100k
        return d3.format(`.${SIGNIFICANT_FIGURES}s`)(value).replace(REGEX_REPLACE_ZEROS_AFTER_DECIMAL, "$1$3");
    }

    // Supress formatting 0.1
    if (value < 0.01) {
        // Replace any 0's after the decimal point to swap strings like 1.000m to 1m
        return d3.format(`.${SIGNIFICANT_FIGURES}s`)(value).replace(REGEX_REPLACE_ZEROS_AFTER_DECIMAL, "$1$3");
    }

    return value.toString();
};