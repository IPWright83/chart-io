export type Value = number | string | Date | { valueOf(): number };

/**
 * Used to represent the general shape of Data
 */
export type Data = Record<string, Value>[];
