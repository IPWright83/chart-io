import { useMemo } from "react";

/**
 * Convert a possible string value to an array in a memoized manner.
 * @param fields       The field or set of fields
 * @return             The fields, always as an array
 */
export function useArray(fields: string | Array<string>): Array<string> {
    return useMemo(() => {
        if (fields === null || fields === undefined) {
            return [];
        }

        return fields;
    }, [fields]);
}
