import { Types } from "../Types";

import { getBoolType } from "./getBoolType";
import { getDateType } from "./getDateType";
import { getNumberType } from "./getNumberType";

/**
 * Obtain the data type for the field
 * @param  {Any}  value                  The value to check for a date type
 * @param  {Types} previousDetection      The previously most specic detected type
 * @return {Types}                        The most specific discovered type
 */
const getDataType = (value, previousDetection = Types.Unknown) => {
    // The Types.Null <= previousDetection code is an
    // optimisation to prevent us checking for a type
    // that we've already ruled out. As we're only interested
    // in the most specific type for all values in the field

    // Skip if the value is null
    if (value === null || value === undefined) {
        return previousDetection === Types.Unknown ? Types.Null : previousDetection;
    }

    if (Types.Boolean <= previousDetection) {
        const boolType = getBoolType(value);
        if (boolType) {
            return boolType;
        }
    }

    if (Types.Double <= previousDetection) {
        const numberType = getNumberType(value);
        if (numberType) {
            return Math.min(numberType, previousDetection);
        }
    }

    if (Types.DateTime <= previousDetection) {
        const dateType = getDateType(value);
        if (dateType) {
            return dateType;
        }
    }

    return Types.String;
};

export { getDataType };
