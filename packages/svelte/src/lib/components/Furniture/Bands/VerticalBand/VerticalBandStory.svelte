<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { themes } from "@chart-io/core";
    import VerticalBand from "./VerticalBand.svelte";
    import { createMockStorybookStore } from "../../../../testUtils";
    import Provider from "../../../../redux/StoreProvider.svelte";

    export let x: string;
    export let xStart: number | undefined = undefined;
    export let xStop: number | undefined = undefined;
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
                [x]: {
                    scale: d3.scaleLinear(),
                    domain: [0, 10000],
                    range: [0, 500],
                },
            },
        },
    });
</script>

<div style="width: 500px; height: 200px;">
    <svg>
        <Provider {store}>
            <VerticalBand {x} {xStart} {xStop} {fill} {stroke} {opacity} />
        </Provider>
    </svg>
</div> 