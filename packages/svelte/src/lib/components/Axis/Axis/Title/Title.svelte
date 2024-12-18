<script lang="ts">
    import type { ITitleProps } from "@chart-io/types";

    let { position, title }: ITitleProps = $props();
</script>

<text className={`chart-io axis-title axis-title-${position}`} transform={transform} style={style}>
    {title}
</text>

<style>
    .axis-title {
        textAnchor: "middle";
        fontSize: 14;
        userSelect: "none";
    }
</style>
