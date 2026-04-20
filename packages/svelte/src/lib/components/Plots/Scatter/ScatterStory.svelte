<script lang="ts">
    import isChromatic from "chromatic/isChromatic";
    import { sales_records_dataset } from "../../../../data/sales_records_dataset";
    import XYChart from "../../XYChart/XYChart.svelte";
    import XAxis from "../../Axis/XAxis/XAxis.svelte";
    import YAxis from "../../Axis/YAxis/YAxis.svelte";
    import Scatter from "./Scatter.svelte";
    import Scatters from "./Scatters.svelte";

    export let x: string = "Units Sold";
    export let y: string = "Total Profit";
    export let y2: string | undefined = undefined;
    export let y3: string | undefined = undefined;
    export let radius: number = 5;
    export let color: string | undefined = undefined;
    export let useScatters: boolean = false;
    export let width: number = 800;
    export let height: number = 500;

    $: allYFields = [y, y2, y3].filter(Boolean) as string[];
</script>

<XYChart
    {width}
    {height}
    plotMargin={{ left: 70, right: 40, top: 40, bottom: 40 }}
    data={sales_records_dataset}
    animationDuration={isChromatic() ? 0 : 250}
>
    <YAxis fields={allYFields} />
    <XAxis fields={[x]} />
    {#if useScatters}
        <Scatters {x} ys={allYFields} {radius} />
    {:else}
        <Scatter {x} {y} {radius} {color} />
    {/if}
</XYChart>
