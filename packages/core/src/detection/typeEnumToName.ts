import { Type } from "./Type";

/**
 * Find the name of the data type
 * @param  type        The enum type to lookup
 * @return             The name of the data type
 */
export function typeEnumToName(type: Type) {
    // @ts-ignore: This is a false positive
    return Object.entries(Type).find(([, value]) => value === type)[0];
}
