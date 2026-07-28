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
 * Recursively groups `rows` by each field in `fields` in turn, producing one hierarchy node per
 * distinct value at each level. The last field in `fields` produces the leaf nodes, which carry the
 * original row as their `datum`; every other level carries a synthetic aggregate `datum` of
 * `{ [field]: key, [value]: total }`
 * @param  rows      The rows to group at this level
 * @param  fields    The remaining fields to group by, innermost ring first
 * @param  value     The name of the value field
 * @return           The hierarchy nodes for this level
 */
function buildLevels(rows: IData, fields: string[], value: string): IPieHierarchyDatum[] {
    const [field, ...rest] = fields;
    const grouped = d3.group(rows, (row) => `${row[field]}`);

    return Array.from(grouped, ([key, groupRows]) => {
        const total = d3.sum(groupRows, (row) => Number(row[value]) || 0);
        const isLeafLevel = rest.length === 0;

        return {
            key,
            value: isLeafLevel ? total : undefined,
            datum: isLeafLevel ? groupRows[0] : { [field]: key, [value]: total },
            children: isLeafLevel ? undefined : buildLevels(groupRows, rest, value),
        };
    });
}

/**
 * Builds an N-level hierarchy (one level per entry in `categories`, innermost ring first) from a flat
 * dataset, and lays it out radially so that each node occupies an angular span proportional to its
 * total, subdivided by its children.
 *
 * For example, given `categories=["region", "product"]`, `value="sales"` and the data
 * `[{ region: "North", product: "Widgets", sales: 5 }, { region: "North", product: "Gadgets", sales: 5 },
 * { region: "South", product: "Widgets", sales: 10 }]`, this builds a root with two depth-1 children
 * ("North" with a synthetic `datum: { region: "North", sales: 10 }`, and "South" with
 * `datum: { region: "South", sales: 10 }`), each with their own depth-2 children for "Widgets"/"Gadgets".
 * "North" ends up spanning half the circle (angle `[0, π]`) since it accounts for half the total sales,
 * split evenly between its two depth-2 children ("Widgets" getting `[0, π/2]`, "Gadgets" getting `[π/2, π]`).
 * Passing a third field, e.g. `categories=["region", "product", "sku"]`, extends the same shape with a
 * further depth-3 ring
 * @param  data          The full dataset
 * @param  categories    The ordered list of fields to build each ring from, innermost ring first
 * @param  value         The name of the value field
 * @param  sort          Should the slices be sorted by value (descending)?
 * @return               The root of the laid out hierarchy
 */
export function buildHierarchy(data: IData, categories: string[], value: string, sort: boolean) {
    const children = buildLevels(data, categories, value);
    const root = d3.hierarchy<IPieHierarchyDatum>({ key: "root", children }).sum((d) => d.value ?? 0);

    if (sort) {
        root.sort((a, b) => d3.descending(a.value, b.value));
    }

    return d3.partition<IPieHierarchyDatum>().size([2 * Math.PI, 1])(root) as IPieHierarchyNode;
}
