import * as d3 from "@chart-io/d3";

/**
 * Formats a Date, defaulting the resolution to the first non-zero part
 * @param  value     The date to format
 * @return           The date formatted as a string
 */
export function formatDate(value: Date): string {
    const isMilliSecondsZero = value.getMilliseconds() === 0;
    const isSecondsZero = value.getSeconds() === 0;
    const isMinutesZero = value.getMinutes() === 0;
    const isHoursZero = value.getHours() === 0;
    const isDayZero = value.getDate() === 1;
    const isMonthZero = value.getMonth() === 0;

    if (!isMilliSecondsZero) {
        return d3.timeFormat("%x %H:%M:%S.%L")(value);
    }

    if (!isSecondsZero) {
        return d3.timeFormat("%x %H:%M:%S")(value);
    }

    if (!isMinutesZero || !isHoursZero) {
        return d3.timeFormat("%x %H:%M")(value);
    }

    if (!isDayZero) {
        return d3.timeFormat("%x")(value);
    }

    if (!isMonthZero) {
        return d3.timeFormat("%b-%y")(value);
    }

    return d3.timeFormat("%Y")(value);
}
