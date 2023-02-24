import type { IValue } from "./IValue";

/**
 * Used to represent a single data point
 */
export type IDatum = Record<string, IValue | null | undefined>;

/**
 * Used to represent the general shape of Data
 */
export type IData = IDatum[];
