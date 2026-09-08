import type { IPivot } from "../types";

/**
 * The order pivot cycles through each time it's advanced - the full grid (`undefined`, neither axis
 * collapsed) first, then each axis in turn
 */
const PIVOT_CYCLE: Array<IPivot | undefined> = [undefined, "x", "y"];

/**
 * Returns the pivot that follows `current` in the cycle grid -> x -> y -> grid - shared by every
 * trigger that advances a pivotable chart's pivot by one step (e.g. `createPivotAction`'s "Pivot"
 * menu item, or `<Heatmap>` cycling on a left-click of a cell), so they all agree on the same order
 * @param  current   The current pivot, `undefined` meaning the full grid
 * @return           The next pivot in the cycle
 */
export function nextPivot(current: IPivot | undefined): IPivot | undefined {
    return PIVOT_CYCLE[(PIVOT_CYCLE.indexOf(current) + 1) % PIVOT_CYCLE.length];
}
