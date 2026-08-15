---
"@chart-io/core": minor
"@chart-io/react": minor
---

`<StackedDonut>` is now zoomable by default (`zoomable` defaults to `true` instead of `false`). Clicking the donut's center hole now zooms back out one level - previously there was no way to zoom back out by clicking on the chart itself, in either SVG or Canvas mode. While zoomed in, the center hole also now displays the focused node's name whenever nothing's hovered, instead of showing nothing.
