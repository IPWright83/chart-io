<script lang="ts">
    import { chartSelectors, type IState } from "@chart-io/core";
    import type { IScaleType, IValue } from "@chart-io/types";
    import { useSelector } from "../../redux";
    import { calculateScale } from "./calculateScale";
    import Scale from "./Scale.svelte";

    export let fields: string[];
    export let range: number[];
    export let scaleType: IScaleType | undefined = undefined;
    export let aggregate: boolean = false;
    export let domain: IValue[] | undefined = undefined;

    let data = useSelector((s: IState) => chartSelectors.data(s));

    $: scale =
        range && !isNaN(range[0]) && !isNaN(range[1])
            ? calculateScale($data, fields, range, domain, aggregate, scaleType)
            : undefined;
</script>

{#if scale}
    <Scale {fields} {scale} />
{/if}
