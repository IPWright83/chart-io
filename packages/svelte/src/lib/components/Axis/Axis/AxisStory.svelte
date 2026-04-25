<script lang="ts">
    import { themes } from "@chart-io/core";
    import isChromatic from "chromatic/isChromatic";
    import type { IPosition } from "@chart-io/core";
    import XAxis from "../XAxis/XAxis.svelte";
    import YAxis from "../YAxis/YAxis.svelte";
    import { calculateScale } from "../../Scale/calculateScale";
    import { createMockStorybookStore } from "../../../testUtils";
    import StoreProvider from "../../../redux/StoreProvider.svelte";
    import { axisData } from "./axisData";

    export let position: IPosition = "bottom";
    export let fields: string[] = ["integerValue"];
    export let showGridlines: boolean = false;
    export let title: string | undefined = undefined;
    export let tickSizeInner: number = 6;
    export let tickSizeOuter: number = 6;
    export let tickPadding: number = 3;
    export let bottomMargin: number = 30;

    const isVertical = position === "left" || position === "right";
    const width = 800;
    const height = isVertical ? 400 : 100;
    const plotMargin = { left: 30, right: 30, top: 30, bottom: bottomMargin };

    const plotWidth = width - plotMargin.left - plotMargin.right;
    const plotHeight = height - plotMargin.top - plotMargin.bottom;

    const xRange = [plotMargin.left, plotMargin.left + plotWidth];
    const yRange = [plotHeight + plotMargin.top, plotMargin.top];
    const range = isVertical ? yRange : xRange;

    const scale = calculateScale(axisData, fields, range, undefined, false, undefined);
    const domain = scale?.domain() ?? [];

    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            animationDuration: isChromatic() ? 0 : 1000,
            dimensions: {
                width,
                height,
                plotMargin,
            },
            scales: fields.reduce((acc, field) => ({
                ...acc,
                [field]: { scale, domain, range },
            }), {}),
        },
    });
</script>

<StoreProvider overrideStore={store}>
    <svg {width} {height}>
        {#if isVertical}
            <YAxis
                {position}
                {fields}
                {showGridlines}
                {title}
                {tickSizeInner}
                {tickSizeOuter}
                {tickPadding}
            />
        {:else}
            <XAxis
                {position}
                {fields}
                {showGridlines}
                {title}
                {tickSizeInner}
                {tickSizeOuter}
                {tickPadding}
            />
        {/if}
    </svg>
</StoreProvider>
