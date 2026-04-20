<script lang="ts">
    import { themes } from "@chart-io/core";
    import isChromatic from "chromatic/isChromatic";
    import YAxis from "./YAxis.svelte";
    import { calculateScale } from "../../Scale/calculateScale";
    import { createMockStorybookStore } from "../../../testUtils";
    import StoreProvider from "../../../redux/StoreProvider.svelte";

    export let fields: string[] = ["y"];
    export let position = "left";
    export let showGridlines: boolean = true;
    export let title: string | undefined = undefined;

    const data = [{ y: 0 }, { y: 10 }];

    const width = 300;
    const height = 400;
    const plotMargin = { left: 60, right: 40, top: 20, bottom: 40 };
    const plotHeight = height - plotMargin.top - plotMargin.bottom;
    const range = [plotHeight + plotMargin.top, plotMargin.top];

    const scale = calculateScale(data, fields, range, undefined, false, undefined);
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
        <YAxis {position} {fields} {showGridlines} {title} />
    </svg>
</StoreProvider>
