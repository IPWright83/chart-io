import * as d3 from "@chart-io/d3";

import { getMaxStringLength } from "./getMaxStringLength";
import type { IColumnInfo } from "../types";
import { Type } from "../Type";

/**
 * Gets column information specific to the type of the field
 * @param  {Array<Object>} values     The dataset
 * @param  {Types} type               The type of the column
 * @return {Object}                   Any additional information
 */
const getTypeSpecificColumnInfo = (
    values: any[],
    type: Type
): Omit<IColumnInfo, "key" | "count" | "nullCount" | "type" | "cardinality"> | undefined => {
    // Get additioanl number fields
    if (type === Type.Integer || type === Type.Double) {
        const range = [Math.min(...values), Math.max(...values)];
        const isAllNegative = range[0] < 0 && range[1] < 0;
        const isAllPositive = range[0] >= 0 && range[1] > 0;
        const isPossiblePercentage = range[0] >= 0 && range[1] <= 100;

        return {
            range,
            isAllNegative,
            isAllPositive,
            isPossiblePercentage,
            isPossibleCurrency: false,
        };
    }

    // Get additioanl date fields
    if (type === Type.Date || type === Type.DateTime) {
        const valuesAsDates = values.map((v) => Date.parse(v));
        const range = [d3.min(valuesAsDates), d3.max(valuesAsDates)];

        return {
            range,
        };
    }

    // Get additional string fields
    if (type === Type.String) {
        return {
            maxLength: getMaxStringLength(values),
        };
    }
};

export { getTypeSpecificColumnInfo };
