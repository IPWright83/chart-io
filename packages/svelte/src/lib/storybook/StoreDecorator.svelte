<script lang="ts">
    import StoreProvider from "../redux/StoreProvider.svelte";
</script>

<StoreProvider>
    <slot />
</StoreProvider>
