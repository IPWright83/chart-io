<script lang="ts">
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver, IScaleMode } from "@chart-io/types";
    import { useSelector } from "../../../redux";
    import Scatter from "./Scatter.svelte";

    export let x: string;
    export let ys: string[];
    export let radius: number = 5;
    export let colors: IColor[] | undefined = undefined;
    export let scaleMode: IScaleMode = "plot";
    export let interactive: boolean = true;
    export let onMouseOver: IOnMouseOver | undefined = undefined;
    export let onMouseOut: IOnMouseOut | undefined = undefined;
    export let onClick: IOnClick | undefined = undefined;

    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    $: palette = colors ?? $theme?.series?.colors ?? [];
</script>

{#each ys as y, i}
    <Scatter
        {x}
        {y}
        {radius}
        {scaleMode}
        {interactive}
        {onMouseOver}
        {onMouseOut}
        {onClick}
        color={`${palette[i]}`}
    />
{/each}
