import { IPrimitive } from "../types";

/**
 * Determine if a value is null or undefined
 * @param  value  The value to check
 * @return        True if the value is null or undefined, false otherwise
 */
export const isNullOrUndefined = (value: IPrimitive): boolean =>
  value === null || value === undefined;
