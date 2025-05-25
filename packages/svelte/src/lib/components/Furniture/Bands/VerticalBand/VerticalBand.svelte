<script lang="ts">
    import type { IColor, IValue } from "@chart-io/types";
    import { useSelector } from "../../../../redux/useSelector";
    import { chartSelectors } from "@chart-io/core";

    export let x: string;
    export let xStart: IValue | undefined = undefined;
    export let xStop: IValue | undefined = undefined;
    export let opacity: number = 0.5;
    export let fill: IColor | undefined = undefined;
    export let stroke: IColor | undefined = undefined;

    $: top = useSelector((s) => chartSelectors.dimensions.plot.top(s));
    $: plotHeight = useSelector((s) => chartSelectors.dimensions.plot.height(s));
    $: scale = useSelector((s) => chartSelectors.scales.getScale(s, x, "plot"));

    $: startX = scale && xStart ? scale(xStart) : scale?.range()?.[0];
    $: stopX = scale && xStop ? scale(xStop) : scale?.range()?.[scale.range().length - 1];
</script>

{#if scale && startX !== undefined && stopX !== undefined}
    <rect
        y={top}
        height={plotHeight}
        width={stopX - startX}
        x={startX}
        class="rect"
        style:stroke={stroke?.toString()}
        style:opacity={opacity}
        style:fill={fill?.toString()}
        style:pointer-events="none"
    />
{/if} 