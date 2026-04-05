<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { chartSelectors, eventSelectors } from "@chart-io/core";
    import type { IDropline } from "@chart-io/types";
    import { useSelector } from "../../redux";

    export let showHorizontal: boolean = true;
    export let showVertical: boolean = true;
    export let layer: SVGGElement;

    let animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    let theme = useSelector((s: IState) => chartSelectors.theme(s));
    let droplinesStore = useSelector((s: IState) => eventSelectors.droplines(s, true));

    // Track store values in component state
    $: currentDroplines = ($droplinesStore ?? []).filter(
        (dl) => (dl.isVertical && showVertical) || (dl.isHorizontal && showHorizontal),
    );
    $: currentTheme = $theme;
    $: currentAnimationDuration = $animationDuration;

    function updateDroplines() {
        if (!layer) return;

        const join = d3
            .select(layer)
            .selectAll(".dropline")
            .data(currentDroplines, (d: IDropline) => `${d.x1}-${d.x2}-${d.y1}-${d.y2}`);

        join.exit().remove();

        // Add any new droplines
        join.enter()
            .append("line")
            .attr("class", "chart-io dropline")
            .attr("point-events", "none")
            .style("stroke-dasharray", currentTheme.droplines.strokeDasharray)
            .style("stroke-opacity", currentTheme.droplines.strokeOpacity)
            .style("stroke-width", currentTheme.droplines.strokeWidth)
            .style("stroke", (d) => `${d.color}`)
            .attr("x1", (d) => d.x1)
            .attr("x2", (d) => d.x1)
            .attr("y1", (d) => d.y1)
            .attr("y2", (d) => d.y1)
            .transition()
            .delay(currentAnimationDuration)
            .duration(currentAnimationDuration)
            .attr("x2", (d) => d.x2)
            .attr("y2", (d) => d.y2);
    }

    $: if (currentDroplines && layer) {
        updateDroplines();
    }
</script>
