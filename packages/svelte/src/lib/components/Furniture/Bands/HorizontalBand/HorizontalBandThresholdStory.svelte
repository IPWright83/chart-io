<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { themes } from "@chart-io/core";
    import HorizontalBand from "./HorizontalBand.svelte";
    import { createMockStorybookStore } from "../../../../testUtils";
    import Provider from "../../../../redux/StoreProvider.svelte";
    import XYChart from "../../../XYChart/XYChart.svelte";
    import YAxis from "../../../Axis/YAxis/YAxis.svelte";
    import XAxis from "../../../Axis/XAxis/XAxis.svelte";
    import Scatter from "../../../Plots/Scatter/Scatter.svelte";

    const y = "Total Profit";
    const x = "Units Sold";

    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: {
                width: 800,
                height: 400,
                plotMargin: { left: 70, top: 20, bottom: 20, right: 20 },
            },
            scales: {
                [y]: {
                    scale: d3.scaleLinear(),
                    domain: [0, 1000000],
                    range: [400, 0],
                },
                [x]: {
                    scale: d3.scaleLinear(),
                    domain: [0, 10000],
                    range: [0, 800],
                },
            },
        },
    });

    // Mock data similar to sales_records_dataset
    const data = Array.from({ length: 50 }, () => ({
        [x]: Math.random() * 10000,
        [y]: Math.random() * 1000000,
    }));
</script>

<div style="width: 800px; height: 400px;">
    <Provider {store}>
        <XYChart {data} width={800} height={400}>
            <YAxis fields={[y]} />
            <XAxis fields={[x]} />
            <HorizontalBand {y} yStop={300000} fill="red" opacity={0.1} />
            <HorizontalBand {y} yStart={300000} yStop={900000} fill="orange" opacity={0.1} />
            <HorizontalBand {y} yStart={900000} fill="green" opacity={0.1} />
            <Scatter {x} {y} />
        </XYChart>
    </Provider>
</div> 