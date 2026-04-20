<script lang="ts">
    import type { IMargin, ITheme } from "@chart-io/core";
    import XYChart from "../../XYChart/XYChart.svelte";
    import XAxis from "../../Axis/XAxis/XAxis.svelte";
    import YAxis from "../../Axis/YAxis/YAxis.svelte";
    import Bar from "./Bar.svelte";

    export let width: number = 500;
    export let height: number = 500;
    export let plotMargin: IMargin = { left: 70, right: 40, top: 40, bottom: 40 };
    export let data: Record<string, unknown>[] = [];
    export let x: string;
    export let y: string;
    export let color: string | undefined = undefined;
    export let theme: "light" | "dark" | ITheme = "light";
</script>

<XYChart {width} {height} {plotMargin} {data} {theme}>
    <XAxis fieldName={x} />
    <YAxis fieldName={y} scaleType="band" />
    <Bar {x} {y} {color} />
</XYChart>
