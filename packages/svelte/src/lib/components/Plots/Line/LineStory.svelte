<script lang="ts">
    import isChromatic from "chromatic/isChromatic";
    import { waves } from "../../../../data/waves";
    import XYChart from "../../XYChart/XYChart.svelte";
    import XAxis from "../../Axis/XAxis/XAxis.svelte";
    import YAxis from "../../Axis/YAxis/YAxis.svelte";
    import Line from "./Line.svelte";
    import Lines from "./Lines.svelte";

    export let x: string = "x";
    export let y: string = "sin";
    export let y2: string | undefined = undefined;
    export let color: string | undefined = undefined;
    export let useLines: boolean = false;
    export let width: number = 800;
    export let height: number = 500;

    $: allYFields = [y, y2].filter(Boolean) as string[];
</script>

<XYChart
    {width}
    {height}
    plotMargin={{ left: 70, right: 40, top: 40, bottom: 40 }}
    data={waves}
    animationDuration={isChromatic() ? 0 : 500}
>
    <YAxis fields={allYFields} />
    <XAxis fields={[x]} />
    {#if useLines}
        <Lines {x} ys={allYFields} />
    {:else}
        <Line {x} {y} {color} />
    {/if}
</XYChart>
