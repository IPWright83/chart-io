import { childrenToArray } from "../../utils";

/**
 * Checks whether any of the children is a plot with a hole in the middle (e.g. a `<Donut>` or
 * `<StackedDonut>`), as opposed to a `<Pie>` which has no hole to display a center value in
 * @param {any} children    A single React component, or several React child components
 * @return                  True if a plot with a center hole is present
 */
export function hasCenterHolePlot(children: any) {
    return childrenToArray(children)
        .filter((c) => c)
        .some((c) => c.type.hasCenterHole);
}
