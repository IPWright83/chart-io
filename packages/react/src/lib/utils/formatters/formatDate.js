import * as d3 from "d3";

/**
 * Formats a Date, defaulting to the resolution to the first non-zero part
 * @param  {Date} value     The date to format
 * @return {String}         The date formatted as a string
 */
export const formatDate = (value) => {
    const isSecondsZero = value.getSeconds() === 0;
    const isMinutesZero = value.getMinutes() === 0;
    const isHoursZero = value.getHours() === 0;
    const isDayZero = value.getDate() === 1;
    const isMonthZero = value.getMonth() === 0;

    if (!isSecondsZero) {
        return d3.timeFormat("%x %H:%m:%S")(value);
    }

    if (!isMinutesZero || !isHoursZero) {
        return d3.timeFormat("%x %H:%m")(value);
    }

    if (!isDayZero) {
        return d3.timeFormat("%d/%m/%Y")(value);
    }

    if (!isMonthZero) {
        return d3.timeFormat("%b-%y")(value);
    }

    return d3.timeFormat("%Y")(value);
};
