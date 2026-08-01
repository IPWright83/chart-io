---
"@chart-io/core": minor
"@chart-io/react": minor
---

Add a `<Radar>` chart, the polar equivalent of `<Lines>`: one closed, filled polygon per series connecting a point per category around a shared angular scale, with a marker at each vertex for hover/click tooltips. New `<AngleAxis>` and `<RadiusAxis>` components (and matching `AngleScale`/`RadiusScale`) provide the spokes/category labels and concentric rings/value labels that `<Radar>` needs, following the same `<XAxis>`/`<YAxis>` pattern used by `<Line>`. `@chart-io/core` gains a generic `renderPolygon` canvas primitive so Radar series support Canvas rendering and hit-testing like other plots.
