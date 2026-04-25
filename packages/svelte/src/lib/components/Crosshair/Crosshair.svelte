<script lang="ts">
    import { chartSelectors, eventSelectors, type IState } from "@chart-io/core";
    import { useSelector } from "../../redux";

    /**
     * Should horizontal droplines be shown?
     * @default true
     */
    export let showHorizontal: boolean = true;

    /**
     * Should vertical droplines be shown?
     * @default true
     */
    export let showVertical: boolean = true;

    let left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    let top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    let plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    let plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    let theme = useSelector((s: IState) => chartSelectors.theme(s));
    let position = useSelector((s: IState) => eventSelectors.position(s));
</script>

{#if $position?.x || $position?.y}
    {#if showHorizontal}
        <line
            x1={$left}
            x2={$left + $plotWidth}
            y1={$position.y}
            y2={$position.y}
            stroke={`${$theme.crosshair.stroke}`}
            stroke-opacity={$theme.crosshair.strokeOpacity}
            stroke-width={$theme.crosshair.strokeWidth}
            stroke-dasharray={$theme.crosshair.strokeDasharray}
            style="pointer-events: none"
        />
    {/if}
    {#if showVertical}
        <line
            x1={$position.x}
            x2={$position.x}
            y1={$top}
            y2={$top + $plotHeight}
            stroke={`${$theme.crosshair.stroke}`}
            stroke-opacity={$theme.crosshair.strokeOpacity}
            stroke-width={$theme.crosshair.strokeWidth}
            stroke-dasharray={$theme.crosshair.strokeDasharray}
            style="pointer-events: none"
        />
    {/if}
{/if}
