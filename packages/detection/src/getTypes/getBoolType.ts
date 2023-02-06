import { Type } from "../Type";

/**
 * If the value is a boolean, obtain it's Type
 * @param  value   The value to check for a boolean type
 * @return         Either a Type.Boolean or null
 */
export function getBoolType(value: any): Type.Boolean | null {
    if (value === true || value === false) {
        return Type.Boolean;
    }

    if (value === "Yes" || value === "YES" || value === "yes") {
        return Type.Boolean;
    }

    if (value === "No" || value === "NO" || value === "no") {
        return Type.Boolean;
    }

    return null;
}
