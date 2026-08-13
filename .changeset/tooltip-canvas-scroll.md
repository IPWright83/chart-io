---
"@chart-io/core": patch
"@chart-io/react": patch
---

Fixed Canvas-rendered charts (e.g. `<Pie useCanvas>`, `<Donut useCanvas>`, `<Column useCanvas>`) not showing tooltips once the page had been scrolled after the chart mounted. The virtual canvas's hit-testing cached the canvas's bounding rect once on mount and never recomputed it, so scrolling (or any reflow that moved the chart) made every subsequent hover/click sample the wrong pixel and silently find no datum.
