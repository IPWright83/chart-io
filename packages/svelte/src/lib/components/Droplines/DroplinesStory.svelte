<script lang="ts">
    import { themes } from "@chart-io/core";
    import Droplines from "./Droplines.svelte";
    import { createMockStorybookStore } from "../../../testUtils";
    import StoreProvider from "../../../redux/StoreProvider.svelte";

    export let showHorizontal: boolean = true;
    export let showVertical: boolean = true;

    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            animationDuration: 0,
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

<div style="width: 200px; height: 200px;">
    <svg>
        <StoreProvider {store}>
            <Droplines {showVertical} {showHorizontal} />
        </StoreProvider>
    </svg>
</div> 