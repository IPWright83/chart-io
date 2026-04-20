<script lang="ts">
    import type { IColor, IValue } from "@chart-io/core";
    import { useSelector } from "../../../../redux/useSelector";
    import { chartSelectors } from "@chart-io/core";

    export let y: string;
    export let yStart: IValue | undefined = undefined;
    export let yStop: IValue | undefined = undefined;
    export let opacity: number = 0.5;
    export let fill: IColor | undefined = undefined;
    export let stroke: IColor | undefined = undefined;

    let left = useSelector((s) => chartSelectors.dimensions.plot.left(s));
    let plotWidth = useSelector((s) => chartSelectors.dimensions.plot.width(s));
    let _scale = useSelector((s) => chartSelectors.scales.getScale(s, y, "plot"));

    $: startY = $_scale && yStart ? $_scale(yStart) : $_scale?.range()?.[0];
    $: stopY = $_scale && yStop ? $_scale(yStop) : $_scale?.range()?.[$_scale.range().length - 1];
</script>

{#if $_scale && startY !== undefined && stopY !== undefined}
    <rect
        x={$left}
        width={$plotWidth}
        y={stopY}
        height={startY - stopY}
        class="rect"
        style:stroke={stroke?.toString()}
        style:opacity={opacity}
        style:fill={fill?.toString()}
        style:pointer-events="none"
    />
{/if}
