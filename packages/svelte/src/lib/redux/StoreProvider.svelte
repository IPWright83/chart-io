<script lang="ts">
import { setContext } from "svelte";
import { createStore } from "./createStore.ts";
import { STORE_KEY } from "./constants.ts";
import type { IStore } from "@chart-io/core";

const store = createStore();
export let overrideStore: IStore = store;

setContext(STORE_KEY, overrideStore);
</script>

<slot />
