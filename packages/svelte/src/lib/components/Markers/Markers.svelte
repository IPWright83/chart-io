<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { chartSelectors, eventSelectors, type IState } from "@chart-io/core";
    import type { IMarker } from "@chart-io/types";
    import { onMount, afterUpdate } from "svelte";
    import { useSelector } from "../../redux";

    export let layer: Element;
    export let onlyNearest: boolean = true;

    let animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    let theme = useSelector((s: IState) => chartSelectors.theme(s));
    let markers = useSelector((s: IState) => eventSelectors.markers(s, onlyNearest));

    // Track store values in component state
    $: currentMarkers = $markers;
    $: currentTheme = $theme;
    $: currentAnimationDuration = $animationDuration;

    function updateMarkers() {
        if (!layer) return;

        // prettier-ignore
        const join = d3
            .select(layer)
            .selectAll<SVGCircleElement, IMarker>(".marker")
            .data(currentMarkers);

        join.exit().remove();

        // Add any new markers
        const enter = join
            .enter()
            .append("circle")
            .attr("class", "chart-io marker")
            .attr("pointer-events", "none")
            .style("stroke", (d) => `${d.stroke ?? currentTheme.markers.stroke}`)
            .style("stroke-width", currentTheme.markers.strokeWidth)
            .style("filter", (d) => (currentTheme.markers.shadow ? `drop-shadow(0px 0px 10px ${d.fill})` : undefined))
            .style("fill", (d) => `${d.fill ?? "none"}`)
            .attr("r", (d) => d.r1 ?? d.r2 ?? currentTheme.markers.size)
            .attr("cx", (d) => d.cx)
            .attr("cy", (d) => d.cy);

        enter
            .merge(join)
            .attr("cx", (d) => d.cx)
            .attr("cy", (d) => d.cy)
            .style("stroke", (d) => `${d.stroke ?? currentTheme.markers.stroke}`)
            .style("stroke-width", currentTheme.markers.strokeWidth)
            .style("filter", (d) => (currentTheme.markers.shadow ? `drop-shadow(0px 0px 10px ${d.fill})` : undefined))
            .style("fill", (d) => `${d.fill ?? "none"}`)
            .attr("r", (d) => d.r1 ?? d.r2 ?? currentTheme.markers.size)
            .transition()
            .duration(currentAnimationDuration)
            .attr("r", (d) => d.r2 ?? currentTheme.markers.size);
    }

    $: if (currentMarkers && layer) {
        updateMarkers();
    }
</script> 
