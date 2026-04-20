<script lang="ts">
    import { chartSelectors, type IState } from "@chart-io/core";
    import { useSelector } from "../../redux";

    let plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    let plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    let left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    let top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    let plotClipPath = useSelector((s: IState) => chartSelectors.plotClipPath(s));
</script>

<defs>
    <clipPath id={$plotClipPath}>
        <rect width={$plotWidth} height={$plotHeight} x={$left} y={$top} />
    </clipPath>
</defs>
