<script lang="ts">
    import Polygon from "./Polygon.svelte";

    export let points: string;
    export let fill: string | undefined = undefined;
    export let stroke: string | undefined = undefined;
    export let opacity: number = 0.5;
</script>

<div style="width: 500px; height: 200px;">
    <svg>
        <Polygon {points} {fill} {stroke} {opacity} />
    </svg>
</div> 