import type { IData } from "../../types";
import { logWarning } from "../logger";

/**
 * Ensures that no values in the given field are negative and logs a warning if any are found.
 * Doesn't clamp the values itself - callers still need to treat negative values as 0 when they
 * aren't representable (an angular span, a rectangle's area, a segment's width, ...)
 * @param  data                 The full dataset
 * @param  field                The name of the field
 * @param  componentName        The name of the component that requires non-negative values
 * @return                      True if there are no negative values
 */
const ensureNoNegativeValues = (data: IData, field: string, componentName: string): boolean => {
    if (data.some((row) => Number(row[field]) < 0)) {
        // prettier-ignore
        logWarning("W009", `Negative values in the ${field} field aren't supported by <${componentName}> and have been treated as 0.`);

        return false;
    }

    return true;
};

export { ensureNoNegativeValues };
