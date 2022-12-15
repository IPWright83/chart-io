import "./Markers.css";

import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { chartSelectors, eventSelectors, IStore } from "../../store";

export interface IMarkersProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     */
    layer: React.MutableRefObject<JSX.Element>;
}

/**
 * This component renders the markers that are triggered from various plots
 * @return {Component} The Markers component
 */
const Markers = ({ layer }: IMarkersProps) => {
    const animationDuration = useSelector((s: IStore) => chartSelectors.animationDuration(s));
    const theme = useSelector((s: IStore) => chartSelectors.theme(s));
    const markers = useSelector((s: IStore) => eventSelectors.markers(s));

    useEffect(() => {
        if (!layer.current) return;

        const join = d3.select(layer.current).selectAll(".marker").data(markers);

        join.exit().remove();

        // Add any new markers
        const enter = join
            .enter()
            .append("circle")
            .attr("class", "chart-it marker")
            .style("stroke", (d) => d.stroke || theme.markers.stroke)
            .style("stroke-width", theme.markers.strokeWidth)
            .style("filter", (d) => (theme.markers.shadow ? `drop-shadow(0px 0px 10px ${d.fill})` : undefined))
            .style("fill", (d) => d.fill || "none")
            .style("point-events", "none")
            .attr("r", (d) => d.r1 ?? d.r2 ?? theme.markers.size)
            .attr("cx", (d) => d.cx)
            .attr("cy", (d) => d.cy);

        enter
            .merge(join)
            .attr("cx", (d) => d.cx)
            .attr("cy", (d) => d.cy)
            .transition()
            .duration(animationDuration)
            .attr("r", (d) => d.r2 ?? theme.markers.size);
    }, [animationDuration, layer, markers]);

    return null;
};

export { Markers };
