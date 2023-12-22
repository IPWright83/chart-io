import type { IValue } from "./IValue";

/**
 * A scale with an invert function
 */
export interface IInvertScale {
    invert?: (value: IValue) => number;
}
