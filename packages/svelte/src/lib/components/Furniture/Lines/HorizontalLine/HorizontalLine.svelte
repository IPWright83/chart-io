<script lang="ts">
    import type { IColor, INumericValue, IValue } from "@chart-io/types";
    import { useSelector } from "../../../../redux/useSelector.ts";
    import { chartSelectors } from "@chart-io/core";

    export let y: string;
    export let value: IValue;
    export let opacity: number = 1;
    export let stroke: IColor | undefined = undefined;

    $: left = useSelector((s) => chartSelectors.dimensions.plot.left(s));
    $: right = useSelector((s) => chartSelectors.dimensions.plot.right(s));
    $: scale = useSelector((s) => chartSelectors.scales.getScale(s, y, "plot"));
    $: yValue = scale ? scale(value as INumericValue) : null;
</script>

{#if scale && yValue !== null}
    <line
        x1={left}
        x2={right}
        y1={yValue}
        y2={yValue}
        style:stroke={stroke?.toString()}
        style:opacity={opacity}
        style:pointer-events="none"
    />
{/if} 