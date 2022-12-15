import type { IPrimitive } from "../types";

/**
 * Determine if a value is null or undefined
 * @param  value  The value to check
 * @return        True if the value is null or undefined, false otherwise
 */
const isNullOrUndefined = (value: any): boolean => value === null || value === undefined;

export { isNullOrUndefined };
