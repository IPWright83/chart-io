<script lang="ts">
    import type { ITitleProps, IState } from "@chart-io/types";
    import { chartSelectors } from "@chart-io/core";
    import { useSelector } from "../../../../redux";

    let plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    let plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    let plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plot.margin(s));
    // const getTransform = () => undefined;

    let transform = "translate(10, 20)";//$derived(getTransform(position, plotWidth, plotHeight, plotMargin));

    // if (!title) {
    //     return null;
    // }

    let { position, title }: ITitleProps = $props();
</script>

{#if title}
    <text class={`chart-io axis-title axis-title-${position}`} transform={transform}>
        {title} {$plotWidth} {$plotHeight}
    </text>
{/if}

<style>
    .axis-title {
        textAnchor: "middle";
        fontSize: 14;
        userSelect: "none";
    }
</style>
