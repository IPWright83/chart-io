---
"@chart-io/react": patch
---

Fixed the hovered item not being highlighted on Canvas-rendered `<Column useCanvas>`, `<GroupedColumn useCanvas>`, `<StackedColumn useCanvas>`, `<Bar useCanvas>`, `<GroupedBar useCanvas>` and `<StackedBar useCanvas>` charts. Hovering updated the item's opacity on its underlying (detached) DOM node as before, but nothing repainted the visible `<canvas>` bitmap to reflect it, so the highlight silently never appeared - unlike SVG, where the browser repaints the style change on its own. This is the same fix already applied to `<Donut>`/`<Pie>`/`<StackedDonut>` in #245.
