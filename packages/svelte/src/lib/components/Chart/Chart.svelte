<script lang="ts">
    import { createStore, chartActions } from "@chart-io/core";
    import type { IData, IMargin, ITheme } from "@chart-io/types";
    import { setContext } from "svelte";
    import { STORE_KEY } from "../../redux/constants";

    export let width: number = 500;
    export let height: number = 500;
    export let plotMargin: IMargin = { left: 30, right: 30, top: 30, bottom: 30 };
    export let data: IData = [];
    export let animationDuration: number = 250;
    export let theme: "light" | "dark" | ITheme = "light";

    const store = createStore();
    setContext(STORE_KEY, store);

    const chartId = `chart-${Math.random().toString(36).slice(2, 9)}`;
    store.dispatch(chartActions.setChartID(chartId));

    $: store.dispatch(chartActions.setDimensions(width, height, plotMargin));
    $: store.dispatch(chartActions.setData(data));
    $: store.dispatch(chartActions.setAnimationDuration(animationDuration));
    $: store.dispatch(chartActions.setTheme(theme) as any);
</script>

<div style="display: inline-block">
    <svg {width} {height} class="chart-svg">
        <slot />
    </svg>
</div>
