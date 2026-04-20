<script lang="ts">
    import type { IData, IMargin, ITheme } from "@chart-io/types";
    import Chart from "../Chart/Chart.svelte";
    import EventReceiver from "../EventReceiver/EventReceiver.svelte";
    import RectangleClipPath from "../ClipPath/RectangleClipPath.svelte";
    import Markers from "../Markers/Markers.svelte";
    import Droplines from "../Droplines/Droplines.svelte";

    export let width: number = 500;
    export let height: number = 500;
    export let plotMargin: IMargin = { left: 30, right: 30, top: 30, bottom: 30 };
    export let data: IData = [];
    export let animationDuration: number = 250;
    export let theme: "light" | "dark" | ITheme = "light";
    export let showMarkers: boolean = true;
    export let showDroplines: boolean = true;

    let markersLayer: SVGGElement;
    let droplinesLayer: SVGGElement;
</script>

<Chart {width} {height} {plotMargin} {data} {animationDuration} {theme}>
    <EventReceiver />
    <RectangleClipPath />
    <slot />
    {#if showDroplines}
        <g bind:this={droplinesLayer} class="g-droplines" />
        <Droplines layer={droplinesLayer} />
    {/if}
    {#if showMarkers}
        <g bind:this={markersLayer} class="g-markers" />
        <Markers layer={markersLayer} />
    {/if}
</Chart>
