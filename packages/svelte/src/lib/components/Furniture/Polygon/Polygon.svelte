<script lang="ts">
    import type { IColor } from "@chart-io/types";

    export let points: string;
    export let opacity: number = 0.5;
    export let fill: IColor | undefined = undefined;
    export let stroke: IColor | undefined = undefined;
</script>

{#if points}
    <polygon
        class="polygon"
        {points}
        style:stroke={stroke?.toString()}
        style:opacity={opacity}
        style:fill={fill?.toString()}
        style:pointer-events="none"
    />
{/if} 