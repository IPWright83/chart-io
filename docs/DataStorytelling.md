# Data Storytelling: Architecture Proposal

> **Status:** Design proposal, no implementation yet. This document sketches an architecture
> for scene/chapter driven "data stories" (the play-button-plus-annotations pattern popularised
> by the FT, Our World in Data, Flourish, etc.) built on top of the existing `@chart-io/react`
> primitives, plus a pipeline for turning a story into a shareable MP4.

## 1. Why this fits chart-io well

Three things already in the codebase make this cheaper to build than it looks:

- **`<JsonChart config={...} data={...}>`** ([JsonChart.tsx](../packages/react/src/lib/components/JsonChart/JsonChart.tsx))
  already expresses an entire chart — series, axes, colors, interactivity — as a plain,
  serializable JS object (`ISeriesConfig` + axis/chart config). That object is a natural
  **keyframe**: a story is just an ordered list of these.
- **`Chart` already has `animationDuration` and `useCanvas`** ([Chart.md](Chart.md)). Prop changes
  between renders already animate via D3 transitions, and there's already a canvas rendering path
  (`withCanvas`, `VirtualCanvas`, `renderCanvas.ts` — see [renderCanvas.md](renderCanvas.md)) used
  for large datasets. Canvas-first rendering is exactly what a frame-capture pipeline wants.
- **State already lives in Redux** via `withStore`/`createStore` (`@chart-io/core`), with a
  documented extension point for `customReducers`. A story/playback reducer is an additive
  reducer, not a rearchitecture.

The proposal below leans on all three rather than inventing a parallel system.

## 2. Core concept: Story = ordered Scenes over a JsonChart config

```
Story
 ├─ meta            title, author, aspect ratio, theme
 ├─ scenes[]        ordered chapters
 │   ├─ id
 │   ├─ patch       partial JsonChart config + data (see §3)
 │   ├─ annotations[]   Furniture-based callouts scoped to this scene
 │   ├─ caption     on-screen text (burned into video, also read by SR)
 │   ├─ duration    ms the scene holds once its transition completes
 │   └─ transition  { duration, easing }  (defaults to Chart.animationDuration)
 └─ camera[]        optional per-scene viewport/zoom (domain override)
```

A scene does **not** repeat the full chart config — it's a **patch** against the previous
scene's resolved config, similar to how React re-renders on prop diffs today. This keeps
stories small, diffable in code review, and means "add a data point", "introduce a new series",
"zoom into Q3", and "swap chart type" are all just different shapes of patch:

```ts
interface IScene {
    id: string;
    patch: {
        data?: IData;                        // append/replace rows
        series?: Partial<ISeriesConfig>;      // add/remove/restyle series
        axis?: { x?: IXAxisProps; y?: IYAxisProps };
        domain?: { x?: [unknown, unknown]; y?: [number, number] }; // "camera"
    };
    annotations?: IStoryAnnotation[];
    caption?: string;
    durationMs?: number;      // hold time, default 4000
    transitionMs?: number;    // default: inherited Chart.animationDuration
}
```

Resolving scene *n* is `deepMerge(resolve(scene[n-1]), scene[n].patch)` — the same JsonChart
config shape the library already knows how to render, so `<StoryPlayer>` is mostly "compute the
resolved config for the current scene, feed it to `<JsonChart>`".

## 3. Annotation timeline

`Furniture` already provides the visual primitives a story needs: `HorizontalLine`,
`VerticalLine`, `HorizontalBand`, `VerticalBand`, `Polygon`. Storytelling mostly needs one
addition — a **`Callout`** (positioned label + optional connector line/arrow) — plus a thin
wrapper that scopes any Furniture child to a scene range:

```tsx
<StoryScene id="q3-dip">
    <VerticalBand x1="2023-07" x2="2023-09" color="warning" />
    <Callout at={{ x: "2023-08", y: 42 }} text="Supply chain disruption" />
</StoryScene>
```

Annotations enter/exit with the same transition engine as data (fade + slight translate by
default), and are just React children — nothing about `Furniture` needs to change, only how
`<StoryPlayer>` mounts/unmounts them as the active scene changes.

## 4. Playback engine

A new `storyReducer` (registered via the existing `customReducers` extension point on
`withStore`) tracks:

```
{ sceneIndex, status: "idle" | "playing" | "paused" | "scrubbing", clockMs }
```

Two things matter architecturally:

1. **The player drives `clockMs`, not wall-clock `Date.now()` directly.** In normal browser
   playback `clockMs` advances via `requestAnimationFrame`. This indirection is what makes
   export (§6) possible: a headless renderer can advance `clockMs` in fixed steps instead of
   real time, and the player behaves identically either way.
2. **Transitions reuse D3/Chart's existing animation machinery.** Since `Chart` already
   animates prop changes over `animationDuration`, `<StoryPlayer>` doesn't need its own
   interpolation layer for the chart itself — it only needs to interpolate the "camera" (axis
   domain) and orchestrate annotation mount/unmount timing alongside the chart's own transition.

`<StoryPlayer>` itself is a thin composition:

```tsx
<StoryPlayer story={story}>
    {/* renders <JsonChart> internally with the resolved scene config */}
</StoryPlayer>
```

with a scrubber that shows chapter markers (one per scene, like video chapter markers),
play/pause, and keyboard (space, arrows) + touch support. Autoplay defaults to **muted with
on-screen captions**, matching how video actually gets watched on LinkedIn (~85% first view is
sound-off) — captions aren't an accessibility afterthought here, they're load-bearing for the
primary distribution channel.

## 5. Sharing: why MP4, and how to produce it without hand-authoring a video

Iframes and GIFs both lose badly on LinkedIn specifically: LinkedIn's feed algorithm favours
natively-uploaded video, GIFs can't hold a soundtrack/captions or scrub, and an iframe embed
isn't even postable as a feed item at all (LinkedIn strips arbitrary `<iframe>` embeds — you'd
be sharing a link-preview card at best). Native MP4 upload is the only format that autoplays
in-feed. So export needs to be a first-class output of the same Story definition, not an
afterthought screen recording.

The key architectural move: **the exported video must be produced by literally driving the same
`<StoryPlayer>`/`<JsonChart>` components, not a reimplementation.** That's what guarantees the
video matches what people see in the interactive version, and it means new chart types/plots
automatically work in exported video with zero extra code.

### 5.1 Two export tiers

| Tier | Mechanism | Fidelity | Infra |
|---|---|---|---|
| **Quick preview** | `canvas.captureStream(fps)` → `MediaRecorder` in-browser | Good enough for a Slack preview | None — runs client-side |
| **Canonical export** | Headless browser + deterministic clock + frame capture + `ffmpeg` | Frame-accurate, consistent every run | Node/CI service |

The quick tier is useful for "preview before you export" UX but isn't the one to promise
pixel-perfect, repeatable output — `MediaRecorder` timing is wall-clock and jitters under load,
and MP4 muxing support is inconsistent across browsers (Chrome/Safari differ; Firefox has no
native MP4 encoder), so it should produce WebM and be labelled a preview, not the deliverable.

### 5.2 Canonical export pipeline

New package: **`@chart-io/story-export`** (Node, uses Playwright + `ffmpeg`).

```
 Story JSON ──▶ headless Chromium (Playwright)
                 loads a minimal harness page with <StoryPlayer story={...} mode="export" />
                 │
                 ├─ forces useCanvas (cheap, deterministic pixel capture vs. rasterizing SVG)
                 ├─ patches requestAnimationFrame / performance.now with a virtual clock
                 ├─ for each frame:  advance clock by 1000/fps ms → render → capture canvas
                 │                   (page.screenshot() on the canvas element, or
                 │                   canvas.toBuffer() via an injected bridge)
                 └─ emits frames/000001.png, 000002.png, ...
                 │
                 ▼
            ffmpeg -framerate <fps> -i frames/%06d.png -c:v libx264 -pix_fmt yuv420p out.mp4
                 │
                 ▼
       aspect-ratio preset (1:1 / 4:5 / 16:9) + burned-in captions + intro/outro title card
                 ▼
            story.mp4  +  poster.png (first-frame OG image for the link-share fallback)
```

Why this design:

- **Deterministic clock is the load-bearing piece.** Because playback already only reads
  `clockMs` from the reducer (§4), export doesn't need a special "export mode" of the chart —
  only a harness that feeds `clockMs` from a frame counter instead of `rAF`. This is the same
  trick headless visual-regression tooling uses, and it's what makes output reproducible in CI
  (no flaky timing-dependent frames).
- **Canvas over SVG for capture.** The library already has a canvas rendering path for large
  datasets; reusing it for export avoids a second rasterization step (SVG→PNG per frame is
  noticeably slower and font/filter fidelity is a recurring headache with tools like
  `resvg`/`sharp`). `useCanvas` becomes "the export renderer", not just "the big-data renderer".
- **PNG-sequence → ffmpeg, not real-time screen recording.** Rendering every frame synchronously
  and handing a numbered image sequence to `ffmpeg` means the video is exactly as long as the
  story defines, at exactly the target fps, regardless of how slow the machine rendering it is.
- **Captions burned into frames**, not just an `.srt` sidecar — LinkedIn native video has weak
  captioning support depending on upload path, and burned-in captions are what actually get seen
  by sound-off viewers. Still emit `.vtt` alongside for accessibility on the interactive
  version and for platforms that do support it.

### 5.3 Output presets

| Preset | Aspect | Use |
|---|---|---|
| `square` | 1:1, 1080×1080 | LinkedIn/Twitter feed, safest default |
| `portrait` | 4:5, 1080×1350 | LinkedIn feed (more vertical real estate) |
| `landscape` | 16:9, 1920×1080 | YouTube, embeds, presentations |

`Story.meta.aspect` picks the default; `story-export` can render all three from one story in
one CI run since it's just re-running the same deterministic pipeline with a different canvas
size and chart `plotMargin`.

### 5.4 Where this runs

A single CLI (`npx @chart-io/story-export render story.json --preset square`) covers local use.
For "share this on LinkedIn" specifically, the natural integration is a small render service (or
a GitHub Action) that: takes a story, renders all presets, and returns an MP4 + poster PNG +
a hosted interactive URL (built from the same `<StoryPlayer>`, deployed as a static page) — so
the LinkedIn post is the native video upload, and the first comment/link can point back to the
interactive version for anyone who wants to explore rather than just watch.

## 6. Suggested package layout

```
packages/
  core/            existing — add: story/scene reducer, IStory/IScene types, virtual clock
  react/           existing — add: <StoryPlayer>, <StoryScene>, <Callout> (Furniture)
  story-export/    new — Playwright + ffmpeg render pipeline, CLI, aspect-ratio presets
```

Keeping the reducer/types in `@chart-io/core` (already the home for `IStore`, `IColor`, `IData`)
means `@chart-io/svelte` can eventually get a `StoryPlayer` too without duplicating the scene
model — the story/patch/annotation schema is framework-agnostic; only the player component is
per-framework, matching how the rest of the monorepo is split.

## 7. Testing

The project already snapshot-tests canvas plot output (`__image_snapshots__` under
`packages/react/src/lib/components/Plots/**`, via `jest-image-snapshot`). The same technique
extends directly to stories: render each scene's resolved frame at `clockMs = 0` and
`clockMs = transitionMs` (start/end of each transition) and snapshot both — this catches
regressions in patch-merging and annotation timing without needing to diff actual video output.

## 8. Suggested phasing

1. **Scene engine + `<StoryPlayer>`**, no export — patch model, playback reducer, scrubber/chapter
   markers, reusing existing `<JsonChart>`/`Chart` animation. Ships value on its own (embeddable,
   interactive stories) and de-risks the data model before export is built on top of it.
2. **Annotation timeline** — `Callout` + scene-scoped Furniture, caption track (on-screen + `.vtt`).
3. **Deterministic clock** — swap the player's time source behind a flag; add frame-snapshot
   tests (§7). No visible product change, but it's the prerequisite for §5.
4. **`@chart-io/story-export`** — headless capture, ffmpeg muxing, aspect-ratio presets, caption
   burn-in, poster frame.
5. **Hosted render + share flow** — CI/service wrapper, hosted interactive URL generation.

Each phase is independently useful, which matters given (1) and (2) alone already solve "play
button + annotations appearing over time" for embedding purposes — export is additive on top,
not a blocking dependency for the interactive story to ship.
