import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { chartSelectors, eventSelectors } from "../../store";

/**
 * This component renders the markers that are triggered from various plots
 * @return {Component} The Markers component
 */
const Markers = ({ layer }) => {
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const markers = useSelector((s) => eventSelectors.markers(s));

    useEffect(() => {
        if (!layer.current) return;

        const join = d3.select(layer.current).selectAll(".marker").data(markers);

        join.exit().remove();

        // Add any new markers
        const enter = join
            .enter()
            .append("circle")
            .attr("class", "chart-it marker")
            .attr("point-events", "none")
            .style("stroke", (d) => d.stroke || theme.markers.stroke)
            .style("stroke-width", theme.markers.strokeWidth)
            .style("filter", (d) => (theme.markers.shadow ? `drop-shadow(0px 0px 10px ${d.fill})` : undefined))
            .style("fill", (d) => d.fill || "none")
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

Markers.propTypes = {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     * @type {HTMLElement}
     */
    layer: PropTypes.object,
};

export { Markers };
