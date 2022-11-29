import type { Primitive } from "../types";

/**
 * Determines if all the values are unique
 * @param  values   The values to check
 * @return          True if the values are unique
 */
const areValuesUnique = (values: Array<Primitive> = []): boolean => {
    const valueSet = new Set();
    values.forEach((v) => valueSet.add(v));

    return valueSet.size === values.length;
};

export { areValuesUnique };
