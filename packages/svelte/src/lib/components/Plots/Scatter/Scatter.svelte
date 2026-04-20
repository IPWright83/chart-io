<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { chartSelectors, scatter, type IState } from "@chart-io/core";
    import type { IColor, IDatum, IMouseEvent, IOnClick, IOnMouseOut, IOnMouseOver, IScaleMode } from "@chart-io/types";
    import { useSelector, useDispatch } from "../../../redux";
    import { onDestroy } from "svelte";

    export let x: string;
    export let y: string;
    export let z: string | undefined = undefined;
    export let radius: number = 5;
    export let color: string | undefined = undefined;
    export let scaleMode: IScaleMode = "plot";
    export let interactive: boolean = true;
    export let onMouseOver: IOnMouseOver | undefined = undefined;
    export let onMouseOut: IOnMouseOut | undefined = undefined;
    export let onClick: IOnClick | undefined = undefined;

    let layer: SVGGElement;

    const dispatch = useDispatch();
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const zScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, z, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const plotClipPath = useSelector((s: IState) => chartSelectors.plotClipPath(s));

    let fillColor: ReturnType<typeof d3.color>;
    let strokeColor: ReturnType<typeof d3.color>;

    $: if ($theme) {
        const fc = d3.color(`${color ?? $theme.series.colors[0]}`);
        const sc = fc?.darker();
        if (fc) fc.opacity = $theme.series.opacity;
        fillColor = fc;
        strokeColor = sc;
    }

    // Focus state - mirrors React's useFocused hook
    let focused: { datum: IDatum; element: Element; event: any } | null = null;
    let focusCleanup: (() => void) | undefined;

    $: {
        focusCleanup?.();
        focusCleanup = scatter.focus({ dispatch, xScale: $xScale, yScale: $yScale, focused }) ?? undefined;
    }

    // Tooltip state - mirrors React's useTooltip hook
    let tooltipDatum: IDatum | undefined;
    let tooltipColor: IColor | undefined;
    let tooltipEvent: IMouseEvent | undefined;
    let tooltipCleanup: (() => void) | undefined;

    $: {
        tooltipCleanup?.();
        tooltipCleanup = scatter.tooltip({ dispatch, x, y, datum: tooltipDatum, color: tooltipColor, event: tooltipEvent }) ?? undefined;
    }

    function onFocus(params: { datum: IDatum; element: Element; event: any } | null) {
        focused = params;
    }

    function onTooltip(params: { datum: IDatum; event: IMouseEvent; fillColor: IColor } | null) {
        if (!params) {
            tooltipDatum = undefined;
            tooltipColor = undefined;
            tooltipEvent = undefined;
        } else {
            tooltipDatum = params.datum;
            tooltipColor = params.fillColor;
            tooltipEvent = params.event;
        }
    }

    $: if ($xScale && $yScale && layer && fillColor) {
        scatter.render({
            animationDuration: $animationDuration,
            interactive,
            radius,
            layer,
            data: $data,
            fillColor,
            strokeColor,
            onMouseOver,
            onMouseOut,
            onClick,
            onFocus: interactive ? onFocus : undefined,
            onTooltip: interactive ? onTooltip : undefined,
            theme: $theme,
            x,
            y,
            z,
            xScale: $xScale,
            yScale: $yScale,
            zScale: $zScale,
        });
    }

    onDestroy(() => {
        focusCleanup?.();
        tooltipCleanup?.();
    });
</script>

<g
    bind:this={layer}
    class="g-plot scatter"
    clip-path={$plotClipPath ? `url(#${$plotClipPath})` : undefined}
/>
