<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { themes } from "@chart-io/core";
    import HorizontalLine from "./HorizontalLine.svelte";
    import { createMockStorybookStore } from "../../../../testUtils";
    import Provider from "../../../../redux/StoreProvider.svelte";

    export let y: string;
    export let value: number;
    export let stroke: string | undefined = undefined;
    export let opacity: number = 1;

    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: {
                width: 500,
                height: 200,
            },
            scales: {
                [y]: {
                    scale: d3.scaleLinear(),
                    domain: [0, 1000],
                    range: [200, 0],
                },
            },
        },
    });
</script>

<div style="width: 500px; height: 200px;">
    <svg>
        <Provider {store}>
            <HorizontalLine {y} {value} {stroke} {opacity} />
        </Provider>
    </svg>
</div> 