---
"@chart-io/react": patch
---

Fixed `<RadialArea>` and `<RadialAreas>` not being exported from the package - they were built and documented in Storybook, but missing from the barrel exports, so `import { RadialArea } from "@chart-io/react"` resolved to `undefined`.
