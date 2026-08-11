import { d3 } from "../../d3";

import type { IHierarchyNode } from "./buildHierarchy";

// Caps how light a brightened color can get against a light theme, and how dark a darkened color
// can get against a dark theme, so a node with many siblings never washes out to solid white/black
// (indistinguishable from the page background)
const MAX_LIGHTNESS = 0.85;
const MIN_LIGHTNESS = 0.15;

/**
 * Derives a fill color for a node in a hierarchy: depth-1 nodes get a color from `colorScale` keyed by
 * their own key, and every deeper node inherits its parent's color shaded further away from the page
 * background - brightened against a light background, darkened against a dark one - varied by its
 * position among its siblings, so it stays distinguishable from its parent either way
 * @param  node          The node to derive a color for (depth 1 or deeper)
 * @param  colorScale    Maps a depth-1 node's key to its base color
 * @param  background    The theme's background color, used to pick brighten vs. darken
 * @return               The CSS color string for this node
 */
export function colorHierarchyNode(
    node: IHierarchyNode,
    colorScale: (key: string) => string,
    background: string = "#ffffff",
): string {
    if (node.depth === 1) {
        return colorScale(node.data.key).toString();
    }

    const parentColor = colorHierarchyNode(node.parent as IHierarchyNode, colorScale, background);
    const siblings = (node.parent?.children ?? []) as IHierarchyNode[];
    const index = siblings.indexOf(node);
    const t = siblings.length <= 1 ? 0 : index / siblings.length;

    const isDarkTheme = d3.hsl(background).l < 0.5;
    const shaded = isDarkTheme ? d3.hsl(parentColor).darker(t * 1.4) : d3.hsl(parentColor).brighter(t * 1.4);
    shaded.l = isDarkTheme ? Math.max(shaded.l, MIN_LIGHTNESS) : Math.min(shaded.l, MAX_LIGHTNESS);

    return shaded.toString();
}
