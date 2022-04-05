import { max, min } from "d3-array";

import { Types } from "../Types";
import { getMaxStringLength } from "./getMaxStringLength";

/**
 * Gets column information specific to the type of the field
 * @param  {Array<Object>} values     The dataset
 * @param  {Types} type               The type of the column
 * @return {Object}                   Any additional information
 */
const getTypeSpecificColumnInfo = (values, type) => {
  // Get additioanl number fields
  if (type === Types.Integer || type === Types.Double) {
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
  if (type === Types.Date || type === Types.DateTime) {
    const valuesAsDates = values.map((v) => Date.parse(v));
    const range = [min(valuesAsDates), max(valuesAsDates)];

    return {
      range,
    };
  }

  // Get additional string fields
  if (type === Types.String) {
    return {
      maxLength: getMaxStringLength(values),
    };
  }

  return {};
};

export { getTypeSpecificColumnInfo };
