# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install
pnpm install

# Build all packages
pnpm build

# Development (watch mode)
pnpm dev

# Run all tests
pnpm test

# Run tests for a specific package
pnpm --filter @chart-io/react test
pnpm --filter @chart-io/core test

# Run a specific test file
pnpm --filter @chart-io/detection test -- detection.unit.ts

# Watch mode
pnpm --filter @chart-io/react test -- --watch

# Lint
pnpm lint

# Type check
pnpm types

# Storybook
pnpm storybook

# Clean + reinstall
pnpm refresh
```

Test files use the `.unit.ts` / `.unit.tsx` naming pattern.

## Architecture

**@chart-io** is a composable React+D3 charting library, structured as a pnpm monorepo managed by Turbo.

### Package dependency graph

```
@chart-io/react ──┐
@chart-io/svelte ─┼──► @chart-io/core ──► @chart-io/d3
                  │                    ──► @chart-io/detection ──► @chart-io/d3
                  └──► @chart-io/types                                          ──► @chart-io/types
```

- **`packages/core`** — Redux store (chart + event state), D3 renderers (area, bar, column, line, scatter), theme management
- **`packages/react`** — React components, HOCs (`withStore`, `withCanvas`, `withXYPlot`), hooks
- **`packages/svelte`** — Svelte equivalents (in progress)
- **`packages/detection`** — Automatic data-type inference (Date, DateTime, Integer, Double, Boolean, String, etc.)
- **`packages/types`** — Shared TypeScript interfaces (`IScale`, `ITheme`, `IMargin`, `IData`, etc.)
- **`packages/d3`** — Curated D3 v3 module bundle

### State management

Each chart instance owns a Redux store (created via `createStore()`). The store shape:

```
{
  chart: { id, data, animationDuration, scales, dimensions, legend, brush, theme },
  event: { ... }
}
```

`withStore` HOC wraps chart trees with a `<Provider>`. Custom reducers can be injected via a `customReducers` prop. Redux Thunk is used for async actions.

### Component composition pattern

`XYChart` is the top-level public component. It composes:

```
XYChart
└── Chart
    ├── EventReceiver
    ├── RectangleClipPath
    ├── Plot children (Scatter, Line, Area, Bar, …)
    ├── Markers / Droplines / Crosshair
    └── ZoomBrush (optional)
```

React components live in `packages/react/src/lib/components/`, HOCs in `hoc/`, hooks in `hooks/`.

### Rendering

Charts render to SVG by default. Canvas rendering is available via the `withCanvas` HOC. D3 scales and transforms are computed in `@chart-io/core` reducers and passed down through the Redux store.

### Testing

- **Runner:** Jest 29 + SWC transform, jsdom environment
- **Component tests:** React Testing Library
- **Visual tests:** Storybook test-runner + Chromatic (CI)
- **E2E:** Playwright (optional)

### Toolchain

- TypeScript, pnpm 8.10.2, Turbo, Vite (React: v5, Svelte: v6), Changesets for releases
- Node 20 required
