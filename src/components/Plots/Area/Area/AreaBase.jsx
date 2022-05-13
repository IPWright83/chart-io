import "./Area.css";

import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventSelectors } from "../../../../store";
import { plotDefaultProps, plotPropTypes } from "../../../../types";
import { interpolateMultiPath, isNullOrUndefined } from "../../../../utils";

import { useDatumFocus } from "./useDatumFocus";
import { usePathCreator } from "./usePathCreator";

/**
 * Represents an Area Plot on an SVG Element
 * @param  {Object} props       The set of React properties
 * @return {ReactElement}  The Line plot component
 */
const AreaBase = ({ x, y, y2, color, interactive, layer, canvas }) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const eventMode = useSelector((s) => eventSelectors.mode(s));
    const position = useSelector((s) => eventSelectors.position(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));
    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    const fillColor = d3.color(color || theme.colors[0]);
    fillColor.opacity = theme.opacity;
    const strokeColor = fillColor.darker();

    const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0;

    // Used to create our initial path
    usePathCreator(layer, x, y, xScale, yScale, canvas);

    /* On future renders we want to update the path */
    useRender(() => {
        // Area renderer that starts at the 0 point
        const area = d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => xScale(d[x]) + bandwidth)
            .y0((d) => (y2 ? yScale(d[y]) : yScale.range()[0]))
            .y1((d) => (y2 ? yScale(d[y2]) : yScale(d[y])))
            .defined((d) => !isNullOrUndefined(d[y]));

        // Handle Canvas rendering
        if (canvas) {
            const context = canvas.getContext("2d");
            area.context(context);

            // Clear and then re-render the path
            context.clearRect(0, 0, width, height);
            context.beginPath();
            area(sortedData);
            context.fillStyle = fillColor;
            context.strokeStyle = strokeColor;
            context.fill();
            context.stroke();

            return;
        }

        // Handle SVG Rendering
        d3.select(layer.current)
            .select("path")
            .datum(sortedData)
            .style("fill", fillColor)
            .style("stroke", strokeColor)
            .transition("area")
            .duration(animationDuration)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");
                const current = area(d);
                return interpolateMultiPath(previous, current);
            });
    }, [x, y, sortedData, xScale, yScale, layer, canvas, width, height, theme.colors, animationDuration]);

    // If possible respond to global mouse events for tooltips etc
    if (interactive) {
        useDatumFocus(dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, strokeColor.toString());
    }

    return null;
};

AreaBase.propTypes = {
    ...plotPropTypes,

    /**
     * The key of the field used for the y2 position for a stream graph
     * @type {String}
     */
    y2: PropTypes.string,

    /**
     * The canvas element that the line chart should render to
     * @type {Object}
     */
    canvas: PropTypes.object,
};

AreaBase.defaultProps = {
    ...plotDefaultProps,
};

export { AreaBase };
