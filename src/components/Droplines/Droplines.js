import "./Droplines.css";

import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { chartSelectors, eventSelectors } from "../../store";

/**
 * This component renders the droplines that are triggered from various plots
 * @return {ReactElement}  The Background component
 */
const Droplines = ({ layer, showVertical = true, showHorizontal = true }) => {
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));
    const droplines = useSelector((s) => eventSelectors.droplines(s)).filter(
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
            .attr("class", "dropline")
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

Droplines.propTypes = {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     * @type {HTMLElement}
     */
    layer: PropTypes.object,

    /**
     * Should horizontal droplines be shown?
     * @default true
     * @type {Boolean}
     */
    showHorizontal: PropTypes.bool,

    /**
     * Should vertical droplines be shown?
     * @default true
     * @type {Boolean}
     */
    showVertical: PropTypes.bool,
};

export { Droplines };
