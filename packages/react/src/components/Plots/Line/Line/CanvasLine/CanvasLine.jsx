import * as d3 from "d3";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRender } from "../../../../../hooks";
import { chartSelectors, eventSelectors } from "../../../../../store";
import { plotDefaultProps, plotPropTypes } from "../../../../../types";
import { isNullOrUndefined } from "../../../../../utils";
import { useDatumFocus } from "../useDatumFocus";
import { useTooltip } from "../useTooltip";

/**
 * Represents a Line Plot on a Canvas element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
const CanvasLine = ({ x, y, color, layer, canvas }) => {
    const dispatch = useDispatch();
    const gRef = useRef(null);
    const data = useSelector((s) => chartSelectors.data(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const eventMode = useSelector((s) => eventSelectors.mode(s));
    const position = useSelector((s) => eventSelectors.position(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));
    const seriesColor = color || theme.series.colors[0];

    const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0;

    /* On future renders we want to update the path */
    useRender(() => {
        if (!canvas) {
            console.debug("Skipping render - canvas not yet avaliable");
            return null;
        }

        const context = canvas.getContext("2d");

        // We render canvas lines differently to SVG line in that
        // we use the generator provided by D3
        const line = d3
            .line()
            .x((d) => xScale(d[x]) + bandwidth)
            .y((d) => yScale(d[y]))
            .defined((d) => !isNullOrUndefined(d[y]))
            .context(context);

        // Clear and then re-render the path
        context.clearRect(0, 0, width, height);
        context.beginPath();

        line(sortedData);

        context.strokeStyle = seriesColor;
        context.stroke();

        // Note that because we've drawn directly to the canvas, there is no need
        // for us to use the canvas render loop
    }, [x, y, sortedData, xScale, yScale, layer, canvas, width, height]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus(dispatch, gRef, x, y, xScale, yScale, sortedData, eventMode, position, seriesColor);
    useTooltip(dispatch, gRef, x, y, xScale, yScale, sortedData, eventMode, position, seriesColor);

    return <g ref={gRef} />;
};

CanvasLine.propTypes = {
    ...plotPropTypes,

    /**
     * The canvas element that the line chart should render to
     * @type {Object}
     */
    canvas: PropTypes.object,
};

CanvasLine.defaultProps = plotDefaultProps;

export { CanvasLine };
