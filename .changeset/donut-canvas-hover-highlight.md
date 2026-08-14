---
"@chart-io/core": patch
"@chart-io/react": patch
---

Fixed the hovered slice not being highlighted on Canvas-rendered `<Pie useCanvas>`, `<Donut useCanvas>` and `<StackedDonut useCanvas>` charts. Hovering updated the slice's opacity on its underlying (detached) DOM node as before, but nothing repainted the visible `<canvas>` bitmap to reflect it, so the highlight silently never appeared - unlike SVG, where the browser repaints the style change on its own.
