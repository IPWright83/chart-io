import { Type } from "../Type";

/**
 * If the value is a date, obtain it's Type
 * @param  value   The value to check for a date type
 * @return         Either a Type.Date, Type.DateTime or null
 */
export function getDateType(value: any): Type.Date | Type.DateTime | null {
    // Attempt to convert to a date
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) {
        return null;
    }

    // Determine if the time portion is 0
    const date = new Date(timestamp);
    if (
        date.getUTCHours() === 0 &&
        date.getUTCMinutes() === 0 &&
        date.getUTCSeconds() === 0 &&
        date.getUTCMilliseconds() === 0
    ) {
        return Type.Date;
    }

    return Type.DateTime;
}
