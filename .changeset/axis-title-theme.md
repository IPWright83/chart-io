---
"@chart-io/react": patch
"@chart-io/svelte": patch
---

Fixed Axis titles (`<XAxis title="...">`, `<YAxis title="...">`) not picking up the chart's theme - the title text always rendered at a fixed 14px in the browser's default black fill, regardless of the active theme, so it could look inconsistent with the rest of the axis (which does use the theme) or hard to read against a dark background. The title now uses `theme.axis.stroke` for its fill and `theme.font.family`/`theme.font.size` for its typography, matching the tick labels.
