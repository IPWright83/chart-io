<script lang="ts">
    import { chartActions } from "@chart-io/core";
    import type { IScale } from "@chart-io/core";
    import { useStore } from "../../redux";

    export let fields: string[];
    export let scale: IScale;

    const store = useStore();

    $: if (fields && scale) {
        store.dispatch(chartActions.setScales({ fields, scale }) as any);
    }
</script>
