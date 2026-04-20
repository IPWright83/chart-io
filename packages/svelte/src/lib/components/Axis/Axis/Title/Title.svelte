<script lang="ts">
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IPosition } from "@chart-io/core";
    import { useSelector } from "../../../../redux";
    import { getTransform } from "./getTransform";

    export let position: IPosition;
    export let title: string | undefined = undefined;

    let plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    let plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    let plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plot.margin(s));

    $: transform = getTransform(position, $plotWidth, $plotHeight, $plotMargin);
</script>

{#if title}
    <text class={`chart-io axis-title axis-title-${position}`} {transform}>
        {title}
    </text>
{/if}

<style>
    .axis-title {
        text-anchor: middle;
        font-size: 14px;
        user-select: none;
    }
</style>
