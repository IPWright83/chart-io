<script lang="ts">
    import type { IPosition, IScaleType, IValue } from "@chart-io/types";
    import Axis from "../Axis/Axis.svelte";
    import YScale from "../../Scale/YScale.svelte";

    export let position: IPosition = "left";
    export let fields: string | string[];
    export let scaleType: IScaleType | undefined = undefined;
    export let aggregate: boolean = false;
    export let domain: IValue[] | undefined = undefined;
    export let showGridlines: boolean = true;
    export let title: string | undefined = undefined;
    export let tickSizeInner: number = 6;
    export let tickSizeOuter: number = 6;
    export let tickPadding: number = 3;
    export let tickFormat: ((domainValue: any, index: number) => string) | undefined = undefined;
    export let ticks: any[] | undefined = undefined;
    export let tickValues: string[] | number[] | Date[] | undefined = undefined;

    $: fieldsArray = Array.isArray(fields) ? fields : [fields];
</script>

<Axis
    {position}
    {fields}
    {showGridlines}
    {title}
    {tickSizeInner}
    {tickSizeOuter}
    {tickPadding}
    {tickFormat}
    {ticks}
    {tickValues}
/>
<YScale fields={fieldsArray} {scaleType} {aggregate} {domain} />
