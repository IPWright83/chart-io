---
"@chart-io/core": patch
"@chart-io/react": patch
---

Fixed a bug where a deeper hierarchy node's brightened color could wash out to solid white and disappear against the page background - most visible on `<Treemap>`, where a washed-out cell reads as a blank gap rather than just a pale color. Extracted the color derivation `<StackedDonut>` and `<Treemap>` both use into a shared `colorHierarchyNode` utility in `@chart-io/core`, and capped how light a brightened color can get so it can never reach white, however many siblings a node has. Also fixed the same issue in the opposite direction against a dark theme: `colorHierarchyNode` now darkens (rather than brightens) deeper nodes when the theme's background is dark, capped so a color can never wash out to solid black either.
