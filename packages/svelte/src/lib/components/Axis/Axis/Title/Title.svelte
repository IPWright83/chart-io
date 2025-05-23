<script lang="ts">
    import type { ITitleProps, IState } from "@chart-io/types";
    import { chartSelectors } from "@chart-io/core";
    import { useSelector } from "../../../../redux";
    import { getTransform } from "./getTransform";

    let plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    let plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    let plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plot.margin(s));

    let transform = $derived(getTransform(position, plotWidth, plotHeight, plotMargin));

    let { position, title }: ITitleProps = $props();
</script>

{#if title}
    <text class={`chart-io axis-title axis-title-${position}`} transform={transform}>
        {title} {$plotWidth} {$plotHeight}
    </text>
{/if}

<style>
    .axis-title {
        text-anchor: middle;
        font-size: 14px;
        user-select: none;
    }
</style>
