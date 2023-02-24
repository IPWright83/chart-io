import * as d3 from "@d3-chart/d3";
import type { IDropline } from "@d3-chart/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { chartSelectors, eventSelectors, IState } from "../../store";

export interface IDroplinesBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     */
    layer: React.MutableRefObject<Element>;

    /**
     * Should horizontal droplines be shown?
     * @default true
     */
    showHorizontal?: boolean;

    /**
     * Should vertical droplines be shown?
     * @default true
     */
    showVertical?: boolean;
}

/**
 * This component renders the droplines that are triggered from various plots
 * @return {ReactElement}  The Droplines component
 */
export function Droplines({ layer, showVertical = true, showHorizontal = true }: IDroplinesBaseProps) {
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const droplines = useSelector((s: IState) => eventSelectors.droplines(s)).filter(
        (dl) => (dl.isVertical && showVertical) || (dl.isHorizontal && showHorizontal)
    );

    useEffect(() => {
        if (!layer.current) return;

        const join = d3
            .select(layer.current)
            .selectAll(".dropline")
            .data(droplines, (d: IDropline) => `${d.x1}-${d.x2}-${d.y1}-${d.y2}`);

        join.exit().remove();

        // Add any new droplines
        join.enter()
            .append("line")
            .attr("class", "d3-chart dropline")
            .attr("point-events", "none")
            .style("stroke-dasharray", theme.droplines.strokeDasharray)
            .style("stroke-opacity", theme.droplines.strokeOpacity)
            .style("stroke-width", theme.droplines.strokeWidth)
            .style("stroke", (d) => `${d.color}`)
            .attr("x1", (d) => d.x1)
            .attr("x2", (d) => d.x1)
            .attr("y1", (d) => d.y1)
            .attr("y2", (d) => d.y1)
            .transition()
            .delay(animationDuration)
            .duration(animationDuration)
            .attr("x2", (d) => d.x2)
            .attr("y2", (d) => d.y2);
    }, [animationDuration, layer, droplines]);

    return null;
}
