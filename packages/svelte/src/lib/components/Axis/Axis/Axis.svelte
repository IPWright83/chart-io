<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import type { AxisDomain, AxisScale } from "@chart-io/d3";
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IPosition } from "@chart-io/types";

    import { useSelector } from "../../../redux";
    import { getD3Axis } from "./getD3Axis";
    import { getTransform } from "./getTransform";
    import Gridlines from "./Gridlines/Gridlines.svelte";
    import Title from "./Title/Title.svelte";

    export let position: IPosition;
    export let fields: string | string[];
    export let tickSizeInner: number = 6;
    export let tickSizeOuter: number = 6;
    export let tickPadding: number = 3;
    export let ticks: any[] | undefined = undefined;
    export let showGridlines: boolean = true;
    export let title: string | undefined = undefined;
    export let tickFormat: ((domainValue: any, index: number) => string) | undefined = undefined;
    export let tickValues: string[] | number[] | Date[] | undefined = undefined;

    let axisGroup: SVGGElement;

    const field = Array.isArray(fields) ? fields[0] : fields;

    let plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    let plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    let plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plot.margin(s));
    let scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, field, "plot"));
    let theme = useSelector((s: IState) => chartSelectors.theme(s));
    let animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    $: transform = getTransform(position, $plotWidth, $plotHeight, $plotMargin);

    function renderAxis() {
        if (!axisGroup || !$scale || !$scale.domain().length || !$scale.range().length) return;

        const d3Axis = getD3Axis(position, $scale);
        d3Axis
            .scale($scale as AxisScale<AxisDomain>)
            .tickSizeInner(tickSizeInner)
            .tickSizeOuter(tickSizeOuter)
            .tickPadding(tickPadding)
            .tickFormat(tickFormat)
            .tickValues(tickValues)
            .ticks(ticks);

        d3.select(axisGroup)
            .style("color", `${$theme.axis.stroke}`)
            .style("stroke-opacity", $theme.axis.strokeOpacity)
            .style("stroke-width", $theme.axis.strokeWidth)
            .transition()
            .duration($animationDuration)
            .call(d3Axis);
    }

    $: if ($scale && axisGroup) {
        renderAxis();
    }
</script>

<Title {position} {title} />
<g {transform}>
    {#if showGridlines}
        <Gridlines {position} scale={$scale} {ticks} {tickValues} {tickPadding} />
    {/if}
    <g
        bind:this={axisGroup}
        class="chart-io axis axis-{position}"
        style="user-select: none"
    />
</g>
