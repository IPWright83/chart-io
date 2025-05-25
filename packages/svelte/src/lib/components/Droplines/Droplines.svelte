<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { chartSelectors, eventSelectors } from "@chart-io/core";
    import type { IDropline } from "@chart-io/types";
    import { onMount } from "svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let showHorizontal: boolean = true;
    export let showVertical: boolean = true;

    const store: Writable<any> = getContext("store");
    let layer: SVGGElement;
    let droplines: IDropline[] = [];

    $: {
        const state = $store;
        const theme = chartSelectors.theme(state);
        const animationDuration = chartSelectors.animationDuration(state);
        droplines = eventSelectors.droplines(state, true).filter(
            (dl) => (dl.isVertical && showVertical) || (dl.isHorizontal && showHorizontal)
        );

        if (layer) {
            const join = d3
                .select(layer)
                .selectAll(".dropline")
                .data(droplines, (d: IDropline) => `${d.x1}-${d.x2}-${d.y1}-${d.y2}`);

            join.exit().remove();

            // Add any new droplines
            join.enter()
                .append("line")
                .attr("class", "chart-io dropline")
                .attr("point-events", "none")
                .style("stroke-dasharray", theme.droplines.strokeDasharray)
                .style("stroke-opacity", theme.droplines.strokeOpacity)
                .style("stroke-width", theme.droplines.strokeWidth)
                .style("stroke", (d) => `${d.color}`)
                .attr("x1", (d) => d.x1)
                .attr("x2", (d) => d.x1)
                .attr("y1", (d) => d.y1)
                .attr("y2", (d) => d.y1)
                .transition()
                .delay(animationDuration)
                .duration(animationDuration)
                .attr("x2", (d) => d.x2)
                .attr("y2", (d) => d.y2);
        }
    }
</script>

<g class="g-droplines" bind:this={layer}>
    {#each droplines as dropline (dropline)}
        <line
            class="chart-io dropline"
            point-events="none"
            style:stroke-dasharray={$store.chart.theme.droplines.strokeDasharray}
            style:stroke-opacity={$store.chart.theme.droplines.strokeOpacity}
            style:stroke-width={$store.chart.theme.droplines.strokeWidth}
            style:stroke={dropline.color}
            x1={dropline.x1}
            x2={dropline.x2}
            y1={dropline.y1}
            y2={dropline.y2}
        />
    {/each}
</g> 