<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { chartSelectors, eventSelectors, type IState } from "@chart-io/core";
    import type { IDropline } from "@chart-io/types";
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
    export let layer: SVGGElement;

    let animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    let theme = useSelector((s: IState) => chartSelectors.theme(s));
    let _droplines = useSelector((s: IState) => eventSelectors.droplines(s, true));

    $: droplines = ($_droplines ?? []).filter(
        (dl) => (dl.isVertical && showVertical) || (dl.isHorizontal && showHorizontal),
    );

    function updateDroplines() {
        if (!layer) return;

        const join = d3
            .select(layer)
            .selectAll(".dropline")
            .data(droplines, (d: IDropline) => `${d.x1}-${d.x2}-${d.y1}-${d.y2}`);

        join.exit().remove();

        join.enter()
            .append("line")
            .attr("class", "chart-io dropline")
            .attr("point-events", "none")
            .style("stroke-dasharray", $theme.droplines.strokeDasharray)
            .style("stroke-opacity", $theme.droplines.strokeOpacity)
            .style("stroke-width", $theme.droplines.strokeWidth)
            .style("stroke", (d) => `${d.color}`)
            .attr("x1", (d) => d.x1)
            .attr("x2", (d) => d.x1)
            .attr("y1", (d) => d.y1)
            .attr("y2", (d) => d.y1)
            .transition()
            .delay($animationDuration)
            .duration($animationDuration)
            .attr("x2", (d) => d.x2)
            .attr("y2", (d) => d.y2);
    }

    $: if (droplines && layer) {
        updateDroplines();
    }
</script>
