<script lang="ts">
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IColor, IScaleMode } from "@chart-io/core";
    import { useSelector } from "../../../redux";
    import Area from "./Area.svelte";

    export let x: string;
    export let ys: string[];
    export let colors: IColor[] | undefined = undefined;
    export let scaleMode: IScaleMode = "plot";
    export let interactive: boolean = true;

    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    $: palette = colors ?? $theme?.series?.colors ?? [];
</script>

{#each ys as y, i}
    <Area
        {x}
        {y}
        {scaleMode}
        {interactive}
        color={`${palette[i]}`}
    />
{/each}
