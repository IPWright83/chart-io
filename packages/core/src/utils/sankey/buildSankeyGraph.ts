import type { IData, IDatum } from "../../types";
import { ensureNoNegativeValues } from "../checks/ensureNoNegativeValues";

export interface ISankeyNodeDatum {
    /**
     * Uniquely identifies this node, namespaced by level (`${levelIndex}:${key}`) so the same value
     * appearing at different levels (e.g. "Other" at both the 1st and 2nd category) is treated as two
     * distinct nodes
     */
    id: string;
    /**
     * The node's display value, e.g. "Other"
     */
    key: string;
    /**
     * The zero-based index into `categories` this node was built from
     */
    level: number;
    /**
     * A synthetic datum for this node, in the same `{ [field]: key }` shape as a non-leaf
     * `buildHierarchy` node - there's no single row that represents a node once its inbound/outbound
     * links have potentially been summed from many rows
     */
    datum: IDatum;
}

export interface ISankeyLinkDatum {
    /**
     * The id of the node this link flows from
     */
    source: string;
    /**
     * The id of the node this link flows into
     */
    target: string;
    /**
     * The summed value of every row contributing to this source/target pair
     */
    value: number;
}

export interface ISankeyGraphData {
    nodes: ISankeyNodeDatum[];
    links: ISankeyLinkDatum[];
}

/**
 * Builds a Sankey node/link graph from a flat dataset: each row flows through the ordered fields in
 * `categories`, contributing `value` to the link between every consecutive pair of levels. For example,
 * given `categories=["source", "stage", "destination"]`, a row contributes both to the
 * (source -> stage) link and the (stage -> destination) link. Links between the same pair of node
 * values are summed together, rather than drawn as separate parallel flows
 *
 * Negative values aren't representable by a link's width, so - like `buildHierarchy` - they're treated
 * as 0, and a `W009` warning is logged
 * @param  data              The full dataset
 * @param  categories        The ordered list of fields to build each level from, first column first
 * @param  value             The name of the value field
 * @param  componentName     The name of the component building this graph, used in the `W009` warning
 * @return                   The graph's nodes and (aggregated) links
 */
export function buildSankeyGraph(
    data: IData,
    categories: string[],
    value: string,
    componentName: string,
): ISankeyGraphData {
    ensureNoNegativeValues(data, value, componentName);

    const nodeId = (level: number, key: string) => `${level}:${key}`;

    const nodesById = new Map<string, ISankeyNodeDatum>();
    const linksById = new Map<string, ISankeyLinkDatum>();

    data.forEach((row) => {
        const amount = Math.max(0, Number(row[value]) || 0);

        categories.forEach((category, level) => {
            const key = `${row[category]}`;
            const id = nodeId(level, key);

            if (!nodesById.has(id)) {
                nodesById.set(id, { id, key, level, datum: { [category]: key } });
            }

            if (level === 0) return;

            const sourceId = nodeId(level - 1, `${row[categories[level - 1]]}`);
            const linkId = `${sourceId}>${id}`;
            const existingLink = linksById.get(linkId);

            if (existingLink) {
                existingLink.value += amount;
            } else {
                linksById.set(linkId, { source: sourceId, target: id, value: amount });
            }
        });
    });

    return { nodes: Array.from(nodesById.values()), links: Array.from(linksById.values()) };
}
