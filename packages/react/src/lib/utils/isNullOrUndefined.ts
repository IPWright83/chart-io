/**
 * Determine if a value is null or undefined
 * @param  value  The value to check
 * @return        True if the value is null or undefined, false otherwise
 */
export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}
