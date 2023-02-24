import { IValue } from "./IValue";

export interface IFormatter {
    /**
     * An optional prefix to place in-front of formatted text
     */
    prefix?: string;
    /**
     * An optional suffix to place in-front of formatted text
     */
    suffix?: string;
    /**
     * A completely custom format function
     * @param name    The key of the series value being formatted
     * @param value   The value to format
     */
    format?: (name: string, value: IValue) => string;
}
