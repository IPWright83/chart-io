<script lang="ts">
    import * as d3 from "@chart-io/d3";
    import { chartSelectors, eventActions, MOUSE_MOVE_THROTTLE, type IState } from "@chart-io/core";
    import { useSelector, useDispatch } from "../../redux";

    const dispatch = useDispatch();
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));

    let rect: SVGRectElement;

    function throttle(fn: (e: any) => void, delay: number) {
        let lastCall = 0;
        return (e: any) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                fn(e);
            }
        };
    }

    const onMouseMove = throttle((e) => dispatch(eventActions.mouseMove(e)), MOUSE_MOVE_THROTTLE);

    $: if (rect && $plotWidth && $plotHeight) {
        d3.select(rect)
            .attr("width", $plotWidth)
            .attr("height", $plotHeight)
            .on("mouseout", (e) => dispatch(eventActions.mouseExit(e)))
            .on("mouseover", (e) => dispatch(eventActions.mouseEnter(e)))
            .on("mousemove", onMouseMove);
    }
</script>

<rect
    bind:this={rect}
    class="chart-io event-receiver"
    transform="translate({$left || 0}, {$top || 0})"
    style="fill: none; pointer-events: all"
/>
