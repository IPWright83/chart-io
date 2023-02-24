import { Type } from "../Type";

import { getBoolType } from "./getBoolType";
import { getDateType } from "./getDateType";
import { getNumberType } from "./getNumberType";

/**
 * Obtain the data type for the field
 * @param  value                  The value to check for a date type
 * @param  previousDetection      The previously most specic detected type
 * @return                        The most specific discovered type
 */
export function getDataType(value: any, previousDetection: Type = Type.Unknown) {
    // The Types.Null <= previousDetection code is an
    // optimisation to prevent us checking for a type
    // that we've already ruled out. As we're only interested
    // in the most specific type for all values in the field

    // Skip if the value is null
    if (value === null || value === undefined) {
        return previousDetection === Type.Unknown ? Type.Null : previousDetection;
    }

    if (Type.Boolean <= previousDetection) {
        const boolType = getBoolType(value);
        if (boolType) {
            return boolType;
        }
    }

    if (Type.Double <= previousDetection) {
        const numberType = getNumberType(value);
        if (numberType) {
            return Math.min(numberType, previousDetection);
        }
    }

    if (Type.DateTime <= previousDetection) {
        const dateType = getDateType(value);
        if (dateType) {
            return dateType;
        }
    }

    return Type.String;
}
