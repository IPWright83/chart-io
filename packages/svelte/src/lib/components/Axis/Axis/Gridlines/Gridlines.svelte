<script lang="ts">
    import type { AxisDomain, AxisScale } from "@chart-io/d3";
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IPosition } from "@chart-io/types";
    import * as d3 from "@chart-io/d3";

    import { useSelector } from "../../../../redux";
    import { getD3Axis } from "../getD3Axis";
    import { getTickSize } from "./getTickSize";

    export let position: IPosition;
    export let scale: any;
    export let tickPadding: number = 3;
    export let ticks: any = undefined;
    export let tickValues: string[] | undefined = undefined;

    let gridlinesGroup: SVGGElement;

    let plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    let plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    let theme = useSelector((s: IState) => chartSelectors.theme(s));
    let animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    function renderGridlines() {
        if (!gridlinesGroup || !scale || !scale.domain().length || !scale.range().length) return;

        const tickSize = getTickSize(position, $plotWidth, $plotHeight);
        const d3Axis = getD3Axis(position, scale);

        d3Axis
            .scale(scale as AxisScale<AxisDomain>)
            .tickPadding(tickPadding)
            .tickValues(tickValues);

        d3.select(gridlinesGroup)
            .attr("class", `g-gridlines ${position}`)
            .style("color", $theme.gridlines.stroke?.toString())
            .style("stroke-opacity", $theme.gridlines.strokeOpacity)
            .style("stroke-width", $theme.gridlines.strokeWidth)
            .style("pointer-events", "none")
            .transition()
            .duration($animationDuration)
            .call(
                d3Axis
                    .tickSize(-tickSize)
                    .ticks(ticks)
                    .tickFormat(() => null),
            );

        d3.select(gridlinesGroup).select(".domain").remove();
    }

    $: if (scale && gridlinesGroup && $plotWidth && $plotHeight) {
        renderGridlines();
    }
</script>

<g bind:this={gridlinesGroup} />
