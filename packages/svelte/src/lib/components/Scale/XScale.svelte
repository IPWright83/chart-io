<script lang="ts">
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IScaleType, IValue } from "@chart-io/types";
    import { useSelector } from "../../redux";
    import AutoScale from "./AutoScale.svelte";

    export let fields: string[];
    export let scaleType: IScaleType | undefined = undefined;
    export let aggregate: boolean = false;
    export let domain: IValue[] | undefined = undefined;

    let left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    let plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));

    $: range = [$left, $left + $plotWidth];
</script>

<AutoScale {fields} {range} {scaleType} {domain} {aggregate} />
