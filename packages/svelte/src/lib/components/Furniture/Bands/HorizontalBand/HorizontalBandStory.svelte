<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { themes } from "@chart-io/core";
    import HorizontalBand from "./HorizontalBand.svelte";
    import { createMockStorybookStore } from "../../../../testUtils";
    import Provider from "../../../../redux/StoreProvider.svelte";

    export let y: string;
    export let yStart: number | undefined = undefined;
    export let yStop: number | undefined = undefined;
    export let fill: string | undefined = undefined;
    export let stroke: string | undefined = undefined;
    export let opacity: number = 0.5;

    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: {
                width: 500,
                height: 200,
            },
            scales: {
                "Total Profit": {
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
            <HorizontalBand {y} {yStart} {yStop} {fill} {stroke} {opacity} />
        </Provider>
    </svg>
</div> 