<script lang="ts">
    import { themes } from "@chart-io/core";
    import isChromatic from "chromatic/isChromatic";
    import Crosshair from "./Crosshair.svelte";
    import { createMockStorybookStore } from "../../testUtils";
    import StoreProvider from "../../redux/StoreProvider.svelte";

    export let showHorizontal: boolean = true;
    export let showVertical: boolean = true;

    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            animationDuration: isChromatic() ? 0 : 1000,
            dimensions: {
                width: 200,
                height: 200,
            },
        },
        event: {
            mouse: { x: 100, y: 100 },
        },
    });
</script>

<StoreProvider overrideStore={store}>
    <svg>
        <Crosshair {showVertical} {showHorizontal} />
    </svg>
</StoreProvider>
