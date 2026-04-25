<script lang="ts">
    import type { IScaleType, IValue } from "@chart-io/core";

    export let fields: string[];
    export let scaleType: IScaleType | undefined = undefined;
    export let aggregate: boolean = false;
    export let domain: IValue[] | undefined = undefined;
</script>
