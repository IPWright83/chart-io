<script lang="ts">
    import { setContext } from "svelte";
    import { createStore } from "./createStore";
    import { STORE_KEY } from "./constants";
    import type { IStore } from "@chart-io/core";

    const store = createStore();
    export let overrideStore: IStore = store;

    setContext(STORE_KEY, overrideStore);
</script>

<slot />
