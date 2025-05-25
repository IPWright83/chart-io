<script lang="ts">
    import { themes } from "@chart-io/core";
    import isChromatic from "chromatic/isChromatic";
    import Droplines from "./Droplines.svelte";
    import { createMockStorybookStore } from "../../testUtils";
    import StoreProvider from "../../redux/StoreProvider.svelte";

    export let showHorizontal: boolean = true;
    export let showVertical: boolean = true;

    let layer: SVGGElement;

    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            animationDuration: isChromatic() ? 0 : 1000,
        },
        event: {
            droplines: [
                {
                    isHorizontal: true,
                    color: "steelblue",
                    x1: 150,
                    x2: 0,
                    y1: 50,
                    y2: 50,
                },
                {
                    isVertical: true,
                    color: "steelblue",
                    x1: 150,
                    x2: 150,
                    y1: 50,
                    y2: 150,
                },
            ],
        },
    });
</script>

<StoreProvider {store}>
    <svg>
         <g bind:this={layer}>
        <Droplines {layer} {showVertical} {showHorizontal} />
    </g>
    </svg>
</StoreProvider>
