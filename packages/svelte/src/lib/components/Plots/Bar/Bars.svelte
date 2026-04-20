<script lang="ts">
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver, IScaleMode } from "@chart-io/core";
    import { useSelector } from "../../../redux";
    import Bar from "./Bar.svelte";

    export let y: string;
    export let xs: string[];
    export let colors: IColor[] | undefined = undefined;
    export let scaleMode: IScaleMode = "plot";
    export let interactive: boolean = true;
    export let onMouseOver: IOnMouseOver | undefined = undefined;
    export let onMouseOut: IOnMouseOut | undefined = undefined;
    export let onClick: IOnClick | undefined = undefined;

    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    $: palette = colors ?? $theme?.series?.colors ?? [];
</script>

{#each xs as x, i}
    <Bar
        {x}
        {y}
        {scaleMode}
        {interactive}
        {onMouseOver}
        {onMouseOut}
        {onClick}
        color={`${palette[i]}`}
    />
{/each}
