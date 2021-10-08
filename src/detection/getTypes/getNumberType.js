import { Types } from "../Types";

/**
 * If the value is a number, obtain it's Type
 * @param  {Any} value    The value to check for a number type
 * @return {Types}        Either a Types.Integer, Types.Double or null
 */
const getNumberType = (value) => {
    // If the value is a Date object then
    // don't treat it as a number
    if (value instanceof Date) {
        return null;
    }

    // Attempt to convert to a number
    const num = Number(value);
    if (Number.isNaN(num)) {
        return null;
    }

    // If it is a number, is it an Integer?
    if (Number.isInteger(value)) {
        return Types.Integer;
    }

    return Types.Double;
};

export { getNumberType };
