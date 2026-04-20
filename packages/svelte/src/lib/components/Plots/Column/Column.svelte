<script lang="ts">
    import { d3 } from "@chart-io/core";
    import { chartSelectors, column, type IState } from "@chart-io/core";
    import type { IColor, IDatum, IFocused, IMouseEvent, IOnClick, IOnMouseOut, IOnMouseOver, IScaleMode } from "@chart-io/core";
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

    const dispatch = useDispatch();
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const plotClipPath = useSelector((s: IState) => chartSelectors.plotClipPath(s));

    let fillColor: ReturnType<typeof d3.color>;

    $: if ($theme) {
        const fc = d3.color(`${color ?? $theme.series.colors[0]}`);
        if (fc) fc.opacity = $theme.series.opacity;
        fillColor = fc;
    }

    // Focus state
    let focused: IFocused | null = null;
    let focusCleanup: (() => void) | undefined;

    $: {
        focusCleanup?.();
        focusCleanup = column.focus({ dispatch, xScale: $xScale, focused, theme: $theme, grouped: false }) ?? undefined;
    }

    // Tooltip state
    let tooltipDatum: IDatum | undefined;
    let tooltipColors: IColor[] | undefined;
    let tooltipYs: string[] | undefined;
    let tooltipEvent: IMouseEvent | undefined;
    let tooltipCleanup: (() => void) | undefined;

    $: {
        tooltipCleanup?.();
        tooltipCleanup = column.tooltip({ dispatch, x, ys: tooltipYs ?? [y], datum: tooltipDatum, colors: tooltipColors ?? [fillColor as IColor], event: tooltipEvent }) ?? undefined;
    }

    function onFocus(params: IFocused | null) {
        focused = params;
    }

    function onTooltip(params: { datum: IDatum; event: IMouseEvent; fillColors: IColor[]; ys: string[] } | null) {
        if (!params) {
            tooltipDatum = undefined;
            tooltipColors = undefined;
            tooltipYs = undefined;
            tooltipEvent = undefined;
        } else {
            tooltipDatum = params.datum;
            tooltipColors = params.fillColors;
            tooltipYs = params.ys;
            tooltipEvent = params.event;
        }
    }

    $: if ($xScale && $yScale && layer && fillColor) {
        column.render({
            animationDuration: $animationDuration,
            interactive,
            layer,
            data: $data,
            fillColor,
            onMouseOver,
            onMouseOut,
            onClick,
            onFocus: interactive ? onFocus : undefined,
            onTooltip: interactive ? onTooltip : undefined,
            theme: $theme,
            x,
            y,
            xScale: $xScale,
            yScale: $yScale,
        });
    }

    onDestroy(() => {
        focusCleanup?.();
        tooltipCleanup?.();
    });
</script>

<g
    bind:this={layer}
    class="g-plot column"
    clip-path={$plotClipPath ? `url(#${$plotClipPath})` : undefined}
/>
