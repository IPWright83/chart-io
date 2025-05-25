<script lang="ts">
    import type { IColor, INumericValue, IValue } from "@chart-io/types";
    import { useSelector } from "../../../../redux/useSelector";
    import { chartSelectors } from "@chart-io/core";

    export let x: string;
    export let value: IValue;
    export let opacity: number = 1;
    export let stroke: IColor | undefined = undefined;

    $: top = useSelector((s) => chartSelectors.dimensions.plot.top(s));
    $: bottom = useSelector((s) => chartSelectors.dimensions.plot.bottom(s));
    $: scale = useSelector((s) => chartSelectors.scales.getScale(s, x, "plot"));
    $: xValue = scale ? scale(value as INumericValue) : null;
</script>

{#if scale && xValue !== null}
    <line
        y1={top}
        y2={bottom}
        x1={xValue}
        x2={xValue}
        style:stroke={stroke?.toString()}
        style:opacity={opacity}
        style:pointer-events="none"
    />
{/if} 