<script lang="ts">
    import type { IColor } from "@chart-io/types";

    export let fill: IColor;
</script>

<div 
    class="chart-io indicator-line" 
    style:background={fill}
    style:width="10px"
    style:height="3px"
    style:margin-top="7px"
    style:margin-left="5px"
    style:margin-right="5px"
    style:flex-shrink="0"
/> 