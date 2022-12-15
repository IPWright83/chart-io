import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { chartSelectors, eventSelectors, IStore } from "../../store";

export interface IDroplinesProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     */
    layer: React.MutableRefObject<JSX.Element>;

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
const Droplines = ({ layer, showVertical = true, showHorizontal = true }: IDroplinesProps) => {
    const animationDuration = useSelector((s: IStore) => chartSelectors.animationDuration(s));
    const theme = useSelector((s: IStore) => chartSelectors.theme(s));
    const droplines = useSelector((s: IStore) => eventSelectors.droplines(s)).filter(
        (dl) => (dl.isVertical && showVertical) || (dl.isHorizontal && showHorizontal)
    );

    useEffect(() => {
        if (!layer.current) return;

        const join = d3
            .select(layer.current)
            .selectAll(".dropline")
            .data(droplines, (d) => `${d.x1}-${d.x2}-${d.y1}-${d.y2}`);

        join.exit().remove();

        // Add any new droplines
        join.enter()
            .append("line")
            .attr("class", "chart-it dropline")
            .style("point-events", "none")
            .style("stroke-dasharray", theme.droplines.strokeDasharray)
            .style("stroke-opacity", theme.droplines.strokeOpacity)
            .style("stroke-width", theme.droplines.strokeWidth)
            .style("stroke", (d) => d.color)
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
};

export { Droplines };
