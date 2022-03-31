import { useEffect } from "react";
import * as d3 from "d3";

import PropTypes from "prop-types";

/**
 * Renders a Polygon
 * @return {ReactElement}  The Background component
 */
const Polygon = ({ layer, points, opacity, fill, stroke }) => {
    useEffect(() => {
        if (!layer.current || !points) {
            return;
        }

        const join = d3.select(layer.current).selectAll(".custom-path").data([""]);

        join.exit().remove();
        join.enter()
            .append("polygon")
            .attr("class", "polygon")
            .style("fill", fill)
            .style("stroke", stroke)
            .style("opacity", opacity)
            .merge(join)
            .attr("points", points);
    });

    return null;
};

Polygon.propTypes = {
    /**
     * The set of points to display. See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
     * @type {String}
     */
    points: PropTypes.string,
    /**
     * The opactity to use for the Polygon
     * @type {Number}
     */
    opacity: PropTypes.number,
    /**
     * The fill color of the Polygon
     * @type {String}
     */
    fill: PropTypes.string,
    /**
     * The stroke color of the Polygon
     * @type {String}
     */
    stroke: PropTypes.string,
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     * @type {HTMLElement}
     */
    layer: PropTypes.object,
};

export { Polygon };
