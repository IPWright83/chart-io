<script lang="ts">
    import type { IColor, IValue } from "@chart-io/types";
    import { useSelector } from "../../../../redux/useSelector";
    import { chartSelectors } from "@chart-io/core";

    export let y: string;
    export let yStart: IValue | undefined = undefined;
    export let yStop: IValue | undefined = undefined;
    export let opacity: number = 0.5;
    export let fill: IColor | undefined = undefined;
    export let stroke: IColor | undefined = undefined;

    $: left = useSelector((s) => chartSelectors.dimensions.plot.left(s));
    $: plotWidth = useSelector((s) => chartSelectors.dimensions.plot.width(s));
    $: scale = useSelector((s) => chartSelectors.scales.getScale(s, y, "plot"));

    $: startY = scale && yStart ? scale(yStart) : scale?.range()?.[0];
    $: stopY = scale && yStop ? scale(yStop) : scale?.range()?.[scale.range().length - 1];
</script>

{#if scale && startY !== undefined && stopY !== undefined}
    <rect
        x={left}
        width={plotWidth}
        y={stopY}
        height={startY - stopY}
        class="rect"
        style:stroke={stroke?.toString()}
        style:opacity={opacity}
        style:fill={fill?.toString()}
        style:pointer-events="none"
    />
{/if} 