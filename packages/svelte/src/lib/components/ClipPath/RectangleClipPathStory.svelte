<script lang="ts">
    import isChromatic from "chromatic/isChromatic";
    import { createMockStorybookStore } from "../../testUtils";
    import StoreProvider from "../../redux/StoreProvider.svelte";
    import RectangleClipPath from "./RectangleClipPath.svelte";

    const width = 300;
    const height = 300;

    // id is set so the clip path ID is predictable: "clip-path-story"
    const store = createMockStorybookStore({
        chart: {
            id: "story",
            animationDuration: isChromatic() ? 0 : 1000,
            dimensions: { width, height },
        },
    });
</script>

<StoreProvider overrideStore={store}>
    <svg width="500px" height="300px">
        <!-- Black rectangle shows the full chart dimensions -->
        <rect x={0} y={0} {width} {height} fill="none" stroke="black" />
        <RectangleClipPath />
        <!-- Circle extends beyond the clip area to demonstrate clipping -->
        <circle clip-path="url(#clip-path-story)" cx={300} cy={200} r={100} fill="red" />
    </svg>
</StoreProvider>
