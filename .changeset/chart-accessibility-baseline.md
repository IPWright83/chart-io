---
"@chart-io/react": minor
---

Added a baseline accessibility pass across `<Chart>`/`<XYChart>`/`<RadialChart>` and the `Bar`, `Column`,
`GroupedBar`/`GroupedColumn`, `StackedBar`/`StackedColumn`, `Scatter`, `Pie`/`Donut` and `StackedDonut`
plots, in both SVG and Canvas rendering modes:

- `<Chart>` (and therefore every chart) now accepts `title` and `description` props, rendered as the
  root SVG's `<title>`/`<desc>` and wired up via `aria-labelledby`/`aria-describedby` so the chart has a
  real accessible name and description for screen readers. Without a `title`, the chart still falls back
  to `aria-label="Chart"` rather than being announced as an unlabelled graphic. The root SVG is also
  `tabIndex={0}` and defaults to `role="img"`, both overridable.
- Individual marks on the plots listed above now get `role="img"` and a data-driven `aria-label`, so
  their value is announced without relying on the mouse-driven Tooltip. Rather than every mark being
  its own Tab stop - which would make a chart with hundreds of data points take hundreds of Tab presses
  to get past - they use a "roving tabindex" (per the WAI-ARIA Authoring Practices Guide): only one mark
  per plot is in the Tab order at a time, and the Left/Right (or Up/Down) arrow keys move that single
  Tab stop - and the DOM focus - between marks, with Home/End jumping to the first/last.
- Focusing a mark now mirrors the existing hover highlight and fires the same `onMouseOver` callback as
  a mouse hover; Enter/Space on a focused mark mirrors a click and fires `onClick` - including
  `StackedDonut`'s zoom-in/zoom-out behaviour and its center-hole "zoom out" hit target (which, as a
  single control rather than a series of marks, keeps a plain `tabindex={0}`).
- `<Legend>` and `<LegendItem>` now expose `role="list"`/`role="listitem"` semantics, and the decorative
  series-color swatch is marked `aria-hidden` so screen readers only announce the series name.

This is a baseline, not full parity with mouse interaction - keyboard focus does not yet reposition the
floating Tooltip (the `aria-label` on the focused mark covers that for now), and continuous-path plots
(`Line`, `Area`, `Radar`, `RadialArea`) aren't covered in this pass.
