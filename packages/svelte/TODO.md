# Svelte Package — TODO

## Missing Components

- [ ] **TooltipOverlay** — not yet implemented; needed by XYChart for tooltip UI
- [ ] **LegendOverlay** — not yet implemented; needed by XYChart for legend UI
- [ ] **ZoomBrush** — not yet implemented; XYChart has no `zoomBrush` / `brushMargin` props yet
- [ ] **Crosshair** — component exists but is not wired into XYChart

## Differences in Existing Components

### `Chart.svelte` vs React `Chart.tsx`
- [ ] No `useCanvas` support
- [ ] No chart-level `onMouseOver` / `onMouseOut` / `onClick` event handlers
- [ ] No `getChildrenWithProps` equivalent (React propagates `useCanvas`, `animationDuration`, and event handlers to children automatically)
- [ ] No `exportImage` / `exportAsImage` functionality
- [ ] SVG does not apply `backgroundColor` from theme

### `XYChart.svelte` vs React `XYChart.tsx`
- [ ] No `groupEvents` prop / `shouldShowDroplines` logic — droplines always shown
- [ ] Missing `TooltipOverlay` and `LegendOverlay` (blocked by above)
- [ ] Missing `Crosshair` (blocked by wiring into XYChart)
- [ ] Missing `ZoomBrush` support

### `EventReceiver.svelte` vs React `EventReceiver.tsx`
- [ ] Uses a hand-rolled throttle instead of lodash — consider adding lodash as a dependency for consistency

### `Scatter.svelte` vs React `ScatterBase.tsx`
- [ ] No canvas rendering support (`useCanvas` / `renderVirtualCanvas`)
- [ ] No `useLegendItem` — `showInLegend` prop has no effect until LegendOverlay is implemented

### `Markers.svelte` / `Droplines.svelte`
- [ ] Require an external `layer` prop to render into, unlike React where `withSVG` HOC encapsulates this internally — consider refactoring to manage their own `<g>` element

## Infrastructure

- [ ] `packages/svelte/src/lib/redux/createStore.ts` is a placeholder test store — rename or replace with the real `@chart-io/core` `createStore` once the Chart component is the canonical way to create a store
- [ ] `packages/svelte/src/lib/index.ts` is empty — export public components once the API is stable
