<script lang="ts">
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IScaleType, IValue } from "@chart-io/types";
    import { useSelector } from "../../redux";
    import AutoScale from "./AutoScale.svelte";

    export let fields: string[];
    export let scaleType: IScaleType | undefined = undefined;
    export let aggregate: boolean = false;
    export let domain: IValue[] | undefined = undefined;

    let plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    let top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));

    $: range = [$plotHeight + $top, $top];
</script>

<AutoScale {fields} {range} {scaleType} {domain} {aggregate} />
