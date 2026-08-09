import { d3 } from "../../d3";
import type { IData, IDatum } from "../../types";
import { logWarning } from "../logger";

export interface IHierarchyDatum {
    key: string;
    value?: number;
    datum?: IDatum;
    children?: IHierarchyDatum[];
}

export type IHierarchyNode = d3.HierarchyNode<IHierarchyDatum>;

/**
 * Recursively groups `rows` by each field in `fields` in turn, producing one hierarchy node per
 * distinct value at each level. The last field in `fields` produces the leaf nodes, which carry the
 * original row as their `datum`; every other level carries a synthetic aggregate `datum` of
 * `{ [field]: key, [value]: total }`
 * @param  rows      The rows to group at this level
 * @param  fields    The remaining fields to group by, outermost level first
 * @param  value     The name of the value field
 * @return           The hierarchy nodes for this level
 */
function buildLevels(rows: IData, fields: string[], value: string): IHierarchyDatum[] {
    const [field, ...rest] = fields;
    const grouped = d3.group(rows, (row) => `${row[field]}`);

    return Array.from(grouped, ([key, groupRows]) => {
        // Negative values aren't representable by any of the hierarchical layouts (an angular span,
        // a rectangle's area, ...), so they're treated as 0 - see buildHierarchy for the warning
        const total = d3.sum(groupRows, (row) => Math.max(0, Number(row[value]) || 0));
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
 * Builds an N-level hierarchy (one level per entry in `categories`) from a flat dataset, summing and
 * (optionally) sorting each level. The result is a plain, un-laid-out `d3.hierarchy` - callers apply
 * whichever layout suits their chart (e.g. `d3.partition()` for a `<StackedDonut>`, `d3.treemap()` for
 * a treemap, `d3.cluster()`/`d3.tree()` for a dendrogram).
 *
 * For example, given `categories=["region", "product"]`, `value="sales"` and the data
 * `[{ region: "North", product: "Widgets", sales: 5 }, { region: "North", product: "Gadgets", sales: 5 },
 * { region: "South", product: "Widgets", sales: 10 }]`, this builds a root with two depth-1 children
 * ("North" with a synthetic `datum: { region: "North", sales: 10 }`, and "South" with
 * `datum: { region: "South", sales: 10 }`), each with their own depth-2 children for "Widgets"/"Gadgets".
 * Passing a third field, e.g. `categories=["region", "product", "sku"]`, extends the same shape with a
 * further depth-3 level.
 *
 * Negative values in the `value` field aren't representable by any of the layouts built on top of this
 * (an angular span, a rectangle's area, ...), so they're treated as 0, and a `W009` warning is logged
 * @param  data              The full dataset
 * @param  categories        The ordered list of fields to build each level from, outermost level first
 * @param  value             The name of the value field
 * @param  sort              Should each level's nodes be sorted by value (descending)?
 * @param  componentName     The name of the component building this hierarchy, used in the `W009` warning
 * @return                   The root of the summed (and optionally sorted) hierarchy
 */
export function buildHierarchy(
    data: IData,
    categories: string[],
    value: string,
    sort: boolean,
    componentName: string,
): IHierarchyNode {
    if (data.some((row) => Number(row[value]) < 0)) {
        // prettier-ignore
        logWarning("W009", `Negative values in the ${value} field aren't supported by <${componentName}> and have been treated as 0.`);
    }

    const children = buildLevels(data, categories, value);
    const root = d3.hierarchy<IHierarchyDatum>({ key: "root", children }).sum((d) => d.value ?? 0);

    if (sort) {
        root.sort((a, b) => d3.descending(a.value, b.value));
    }

    return root;
}
