<script lang="ts">
    import { d3 } from "@chart-io/core";
    import { area, chartSelectors, eventSelectors, type IState } from "@chart-io/core";
    import type { IScaleMode } from "@chart-io/core";
    import { useSelector, useDispatch } from "../../../redux";
    import { onDestroy } from "svelte";

    export let x: string;
    export let y: string;
    export let y2: string | undefined = undefined;
    export let color: string | undefined = undefined;
    export let scaleMode: IScaleMode = "plot";
    export let interactive: boolean = true;

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

    let fillColor: ReturnType<typeof d3.color>;
    let strokeColor: ReturnType<typeof d3.color>;

    $: if ($theme) {
        const fc = d3.color(`${color ?? $theme.series.colors[0]}`);
        const sc = fc?.darker();
        if (fc) fc.opacity = $theme.series.opacity;
        fillColor = fc;
        strokeColor = sc;
    }

    $: sortedData = $data ? [...$data].sort((a, b) => d3.ascending(a[x] as any, b[x] as any)) : [];

    // Create the initial path once — gives D3 a starting point to animate from
    $: if (layer && $xScale && $yScale && !pathCreated) {
        const bandwidth = ($xScale as any).bandwidth ? ($xScale as any).bandwidth() / 2 : 0;
        const areaFn = d3
            .area()
            .curve(d3.curveLinear)
            .x((d: any) => $xScale(d[x]) + bandwidth)
            .y0(() => $yScale.range()[0] as number)
            .y1((d: any) => $yScale(d[y]));

        d3.select(layer)
            .append("path")
            .datum([
                { [x]: $xScale.domain()[0], [y]: $yScale.domain()[0] },
                { [x]: $xScale.domain()[$xScale.domain().length - 1], [y]: $yScale.domain()[0] },
            ])
            .attr("class", "area")
            .attr("d", areaFn as any);

        pathCreated = true;
    }

    // Re-render on data or scale changes
    $: if (layer && $xScale && $yScale && pathCreated && fillColor) {
        area.render({
            x,
            y,
            y2,
            layer,
            xScale: $xScale,
            yScale: $yScale,
            data: sortedData,
            fillColor,
            strokeColor,
            theme: $theme,
            animationDuration: $animationDuration,
        });
    }

    // Focus (markers + droplines) — driven by global mouse position
    let focusCleanup: (() => void) | undefined;

    $: if (interactive) {
        focusCleanup?.();
        focusCleanup = area.focus({
            dispatch,
            x,
            y,
            color: strokeColor,
            xScale: $xScale,
            yScale: $yScale,
            position: $position ?? { x: 0, y: 0 },
            data: sortedData,
            eventMode: $eventMode,
        }) ?? undefined;
    }

    // Tooltip — driven by global mouse position
    let tooltipCleanup: (() => void) | undefined;

    $: if (interactive) {
        tooltipCleanup?.();
        tooltipCleanup = area.tooltip({
            dispatch,
            x,
            y,
            color: strokeColor,
            xScale: $xScale,
            yScale: $yScale,
            position: $position ?? { x: 0, y: 0 },
            data: sortedData,
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
    class="g-plot area"
    clip-path={$plotClipPath ? `url(#${$plotClipPath})` : undefined}
/>
