<script lang="ts">
    import { themes } from "@chart-io/core";
    import isChromatic from "chromatic/isChromatic";
    import { createMockStorybookStore } from "../../testUtils";
    import Markers from "./Markers.svelte";
    import { StoreProvider } from "../../redux";
    import { onMount } from "svelte";

    export let fill: string | null;
    export let stroke: string;
    export let shadow: boolean;
    export let strokeWidth: number | undefined = undefined;

    let layer: SVGGElement;

    const store = createMockStorybookStore({
        chart: {
            animationDuration: isChromatic() ? 0 : 1000,
            theme: {
                ...themes.light,
                markers: {
                    ...themes.light.markers,
                    shadow,
                    stroke,
                    strokeWidth,
                },
            },
        },
        event: {
            markers: [
                {
                    fill,
                    stroke,
                    r1: 10,
                    r2: 40,
                    cx: 50,
                    cy: 50,
                },
            ],
        },
    });
</script>

<StoreProvider overrideStore={store}>
    <svg width="300px" height="300px">
        <g transform="translate(50,50)" bind:this={layer}>
            <Markers {layer} onlyNearest={true} />
        </g>
    </svg>
</StoreProvider>
