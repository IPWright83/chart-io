import { Types } from "../Types";

/**
 * If the value is a date, obtain it's Type
 * @param  {Any} value    The value to check for a date type
 * @return {Types}        Either a Types.Date, Types.DateTime or null
 */
const getDateType = (value) => {
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
        return Types.Date;
    }

    return Types.DateTime;
};

export { getDateType };
