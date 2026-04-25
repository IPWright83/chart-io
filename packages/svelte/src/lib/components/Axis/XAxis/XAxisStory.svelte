<script lang="ts">
    import { themes } from "@chart-io/core";
    import isChromatic from "chromatic/isChromatic";
    import XAxis from "./XAxis.svelte";
    import { calculateScale } from "../../Scale/calculateScale";
    import { createMockStorybookStore } from "../../../testUtils";
    import StoreProvider from "../../../redux/StoreProvider.svelte";

    export let fields: string[] = ["x"];
    export let position = "bottom";
    export let showGridlines: boolean = true;
    export let title: string | undefined = undefined;

    const data = [{ x: 0 }, { x: 10 }];

    const width = 800;
    const height = 100;
    const plotMargin = { left: 40, right: 40, top: 10, bottom: 50 };
    const plotWidth = width - plotMargin.left - plotMargin.right;
    const range = [plotMargin.left, plotMargin.left + plotWidth];

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
        <XAxis {position} {fields} {showGridlines} {title} />
    </svg>
</StoreProvider>
