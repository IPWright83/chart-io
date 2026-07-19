import { d3 } from "@chart-io/core";
import type { IData, IDatum } from "@chart-io/core";

export interface IPieHierarchyDatum {
    key: string;
    value?: number;
    datum?: IDatum;
    children?: IPieHierarchyDatum[];
}

export type IPieHierarchyNode = d3.HierarchyRectangularNode<IPieHierarchyDatum>;

/**
 * Builds a 2-level hierarchy (`x` then `x2`) from a flat dataset, and lays it out radially so that
 * each `x` category occupies an angular span proportional to its total, subdivided by `x2` within it.
 *
 * For example, given `x="region"`, `x2="product"`, `y="sales"` and the data
 * `[{ region: "North", product: "Widgets", sales: 5 }, { region: "North", product: "Gadgets", sales: 5 },
 * { region: "South", product: "Widgets", sales: 10 }]`, this builds a root with two depth-1 children
 * ("North" with a synthetic `datum: { region: "North", sales: 10 }`, and "South" with
 * `datum: { region: "South", sales: 10 }`), each with their own depth-2 children for "Widgets"/"Gadgets".
 * "North" ends up spanning half the circle (angle `[0, π]`) since it accounts for half the total sales,
 * split evenly between its two depth-2 children ("Widgets" getting `[0, π/2]`, "Gadgets" getting `[π/2, π]`)
 * @param  data     The full dataset
 * @param  x        The name of the inner ring category field
 * @param  x2       The name of the outer ring subdivision field
 * @param  y        The name of the value field
 * @param  sort     Should the slices be sorted by value (descending)?
 * @return          The root of the laid out hierarchy
 */
export function buildHierarchy(data: IData, x: string, x2: string, y: string, sort: boolean) {
    const groupedByX = d3.group(data, (d) => `${d[x]}`);

    const children: IPieHierarchyDatum[] = Array.from(groupedByX, ([key, rows]) => {
        const total = d3.sum(rows, (row) => Number(row[y]) || 0);

        return {
            key,
            // The parent ring represents an aggregate across multiple rows, so its synthetic datum
            // should only expose the fields that are actually meaningful at that level
            datum: { [x]: key, [y]: total },
            children: rows.map((row) => ({
                key: `${row[x2]}`,
                value: Number(row[y]) || 0,
                datum: row,
            })),
        };
    });

    const root = d3.hierarchy<IPieHierarchyDatum>({ key: "root", children }).sum((d) => d.value ?? 0);

    if (sort) {
        root.sort((a, b) => d3.descending(a.value, b.value));
    }

    return d3.partition<IPieHierarchyDatum>().size([2 * Math.PI, 1])(root) as IPieHierarchyNode;
}
