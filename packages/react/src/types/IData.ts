// export type Value = number | string | Date | { valueOf(): number };

import type { IPrimitive } from "./IPrimitive";

/**
 * Used to represent the general shape of Data
 */
export type IData = Record<string, IPrimitive>[];
