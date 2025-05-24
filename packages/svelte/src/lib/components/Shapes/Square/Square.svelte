<script lang="ts">
    import type { IColor } from "@chart-io/types";

    export let fill: IColor;
</script>

<div 
    class="chart-io indicator-square" 
    style:background={fill}
    style:width="10px"
    style:height="10px"
    style:margin-top="4px"
    style:margin-left="5px"
    style:margin-right="5px"
    style:flex-shrink="0"
></div> 