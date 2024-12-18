<script lang="ts">
import { setContext } from "svelte";
import { createStore } from "./createStore.ts";
import { STORE_KEY } from "./constants.ts";

const store = createStore();
export let overrideStore: any = store;

console.log({ overrideStore, state: overrideStore.getState() });
setContext(STORE_KEY, overrideStore);
</script>

<slot />
