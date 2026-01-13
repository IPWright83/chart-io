import * as d3 from "d3";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { useDatumFocus } from "../useDatumFocus";

import { useRender } from "../../../../../hooks";
import { chartSelectors, eventSelectors } from "../../../../../store";
import { plotDefaultProps, plotPropTypes } from "../../../../../types";
import { isNullOrUndefined } from "../../../../../utils";

/**
 * Represents a Area Plot on a Canvas element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Area plot component
 */
const CanvasArea = ({ x, y, y2, color, layer, canvas }) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const eventMode = useSelector((s) => eventSelectors.mode(s));
    const position = useSelector((s) => eventSelectors.position(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    /* On future renders we want to update the path */
    useRender(() => {
        if (!canvas) {
            console.debug("Skipping render - canvas not yet avaliable");
            return null;
        }

        const context = canvas.getContext("2d");

        // We render canvas lines differently to SVG line in that
        // we use the generator provided by D3
        const area = d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => xScale(d[x]))
            .y0((d) => (y2 ? yScale(d[y2]) : yScale.range()[0]))
            .y1((d) => yScale(d[y]))
            .defined((d) => !isNullOrUndefined(d[y]))
            .context(context);

        const fillColor = d3.color(color || theme.colors[0]);
        fillColor.opacity = 0.8;

        // Clear and then re-render the path
        context.clearRect(0, 0, width, height);
        context.beginPath();
        area(sortedData);
        context.fillStyle = fillColor;
        context.strokeStyle = color;
        context.fill();
        context.stroke();

        // Note that because we've drawn directly to the canvas, there is no need
        // for us to use the canvas render loop
    }, [x, y, sortedData, xScale, yScale, layer, canvas, width, height, theme.colors]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus(dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, color);

    return null;
};

CanvasArea.propTypes = {
    ...plotPropTypes,

    /**
     * The canvas element that the line chart should render to
     * @type {Object}
     */
    canvas: PropTypes.object,
};

CanvasArea.defaultProps = plotDefaultProps;

export { CanvasArea };
