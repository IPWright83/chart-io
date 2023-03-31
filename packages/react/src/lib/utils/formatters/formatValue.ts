import { IValue } from "@chart-it/types";

import { formatDate } from "./formatDate";
import { formatNumber } from "./formatNumber";

/**
 * Formats a value for a tooltip
 * @param  name      The name of the field being formatted
 * @param  value     The value to format
 * @return           The value formatted as a string
 */
export function formatValue(name: string, value: IValue | null | undefined): string {
    if (value === null || value === undefined) {
        return "-";
    }

    if (typeof value === "number") {
        return formatNumber(value);
    }

    if (value instanceof Date) {
        return formatDate(value);
    }

    return `${value}`;
}
