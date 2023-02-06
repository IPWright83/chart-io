import { Type } from "../Type";

/**
 * If the value is a number, obtain it's Type
 * @param  value    The value to check for a number type
 * @return          Either a Type.Integer, Type.Double or null
 */
export function getNumberType(value: any): Type.Integer | Type.Double | null {
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
        return Type.Integer;
    }

    return Type.Double;
}
