---
"@chart-io/core": patch
"@chart-io/react": patch
---

Fixed `<AngleAxis>`/`<RadialAxis>` spokes, rings and labels animating in from the center (0,0) on a `<Radar>`/`<RadialArea>`'s very first render - they now appear directly at their final position, and only animate when moving between two real positions on a later update.

Fixed `state.data = [...action.payload]` no longer aliasing the caller's own data array into the Redux store. Immer freezes anything reachable from the store's state, so a caller's own array (e.g. a Storybook story's shared `args.data`) previously became frozen as a side effect of being passed to a chart, breaking any other code (including Storybook's own args handling) that still expected to be able to write to it - most visibly as `Cannot assign to read only property '0' of object '[object Array]'` when switching between Radial chart stories that reused the same data.
