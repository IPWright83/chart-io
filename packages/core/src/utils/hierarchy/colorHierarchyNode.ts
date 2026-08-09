import { d3 } from "../../d3";

import type { IHierarchyNode } from "./buildHierarchy";

// Caps how light a brightened color can get, so a node with many siblings never washes out to
// solid white (indistinguishable from the page background) against a light theme
const MAX_LIGHTNESS = 0.85;

/**
 * Derives a fill color for a node in a hierarchy: depth-1 nodes get a color from `colorScale` keyed by
 * their own key, and every deeper node inherits a brightened version of its parent's color, varied by
 * its position among its siblings
 * @param  node          The node to derive a color for (depth 1 or deeper)
 * @param  colorScale    Maps a depth-1 node's key to its base color
 * @return               The CSS color string for this node
 */
export function colorHierarchyNode(node: IHierarchyNode, colorScale: (key: string) => string): string {
    if (node.depth === 1) {
        return colorScale(node.data.key).toString();
    }

    const parentColor = colorHierarchyNode(node.parent as IHierarchyNode, colorScale);
    const siblings = (node.parent?.children ?? []) as IHierarchyNode[];
    const index = siblings.indexOf(node);
    const t = siblings.length <= 1 ? 0 : index / siblings.length;

    const brightened = d3.hsl(parentColor).brighter(t * 1.4);
    brightened.l = Math.min(brightened.l, MAX_LIGHTNESS);

    return brightened.toString();
}
