---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<ContextMenu>`, a pluggable radial (pie-style) context menu - a ring of icon segments that grow out from a center point on open and shrink back on close, styled from a new `theme.menu` palette. Every item's icon, label and click handler is supplied by the caller, so it can show a different set of actions depending on what it was opened on. `useContextMenu` tracks a menu's open/closed state, position and context independently of how it's triggered, and `<ContextMenuOverlay>` is a ready-made version wired up to a chart: add it as a child of `<Chart>`/`<XYChart>`/`<RadialChart>` and right-clicking anywhere in the chart opens a themed menu that dispatches the selected action into the store.

`actions.tsx` provides a set of example actions: "Reset zoom" (backed by a new `chartActions.resetZoom`, which clears both a zoomable hierarchical plot's zoom path and any `<ZoomBrush>` domain) and "Hide legend"/"Show legend" (backed by a new `chartActions.setLegendVisible`) are fully wired up to the store. "Pivot", "Draw polygon", "Hide data point", "Focus data point" and "Add annotation" are pluggable placeholders with nowhere to dispatch to yet.
