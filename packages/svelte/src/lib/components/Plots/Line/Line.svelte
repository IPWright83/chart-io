<script lang="ts">
    import { d3 } from "@chart-io/core";
    import { chartSelectors, eventSelectors, line, type IState } from "@chart-io/core";
    import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver, IScaleMode } from "@chart-io/core";
    import { useSelector, useDispatch } from "../../../redux";
    import { onDestroy } from "svelte";

    export let x: string;
    export let y: string;
    export let color: string | undefined = undefined;
    export let scaleMode: IScaleMode = "plot";
    export let interactive: boolean = true;
    export let onMouseOver: IOnMouseOver | undefined = undefined;
    export let onMouseOut: IOnMouseOut | undefined = undefined;
    export let onClick: IOnClick | undefined = undefined;

    let layer: SVGGElement;
    let pathCreated = false;

    const dispatch = useDispatch();
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const plotClipPath = useSelector((s: IState) => chartSelectors.plotClipPath(s));
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    $: seriesColor = color ?? $theme?.series?.colors[0];
    $: sortedData = $data ? [...$data].sort((a, b) => d3.ascending(a[x] as any, b[x] as any)) : [];

    // Create the initial path once — gives D3 a starting point to animate from
    $: if (layer && $xScale && $yScale && !pathCreated) {
        const bandwidth = ($xScale as any).bandwidth ? ($xScale as any).bandwidth() / 2 : 0;
        const lineFn = d3
            .line()
            .x((d: any) => $xScale(d[x]) + bandwidth)
            .y((d: any) => $yScale(d[y]));

        d3.select(layer)
            .append("path")
            .datum([
                { [x]: $xScale.domain()[0], [y]: $yScale.domain()[0] },
                { [x]: $xScale.domain()[$xScale.domain().length - 1], [y]: $yScale.domain()[0] },
            ])
            .attr("class", "line")
            .style("fill", "none")
            .style("pointer-events", "none")
            .attr("d", lineFn as any);

        pathCreated = true;
    }

    // Re-render the path when data or scales change
    $: if (layer && $xScale && $yScale && pathCreated) {
        line.render({
            x,
            y,
            layer,
            xScale: $xScale,
            yScale: $yScale,
            data: sortedData,
            color: seriesColor,
            theme: $theme,
            animationDuration: $animationDuration,
        });
    }

    // Focus (markers + droplines) — driven by global mouse position
    let focusCleanup: (() => void) | undefined;

    $: if (interactive && layer) {
        focusCleanup?.();
        focusCleanup = line.focus({
            dispatch,
            x,
            y,
            color: seriesColor,
            xScale: $xScale,
            yScale: $yScale,
            position: $position ?? { x: 0, y: 0 },
            data: sortedData,
            layer,
            eventMode: $eventMode,
        }) ?? undefined;
    }

    // Tooltip — driven by global mouse position
    let tooltipCleanup: (() => void) | undefined;

    $: if (interactive && layer) {
        tooltipCleanup?.();
        tooltipCleanup = line.tooltip({
            dispatch,
            x,
            y,
            color: seriesColor,
            xScale: $xScale,
            yScale: $yScale,
            position: $position ?? { x: 0, y: 0 },
            data: sortedData,
            layer,
            eventMode: $eventMode,
        }) ?? undefined;
    }

    onDestroy(() => {
        focusCleanup?.();
        tooltipCleanup?.();
    });
</script>

<g
    bind:this={layer}
    class="g-plot line"
    clip-path={$plotClipPath ? `url(#${$plotClipPath})` : undefined}
/>
