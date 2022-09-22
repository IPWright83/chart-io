import * as d3 from "d3";
import { interpolatePath } from "d3-interpolate-path";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventSelectors } from "../../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../../types";
import { ensureNoScaleOverflow } from "../../../../utils";

import { useDatumFocus } from "./useDatumFocus";
import { useTooltip } from "./useTooltip";
import { useMultiPathCreator } from "./useMultiPathCreator";

/**
 * Represents a stacked Area Plot on an SVG Element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
const StackedAreaBase = ({ x, ys, colors, interactive, layer, canvas }) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, ys[0]));
    const eventMode = useSelector((s) => eventSelectors.mode(s));
    const position = useSelector((s) => eventSelectors.position(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    // Used to create our initial path
    useMultiPathCreator(layer, x, ys, xScale, yScale, canvas);

    /* On future renders we want to update the path */
    useRender(async () => {
        ensureNoScaleOverflow(yScale, data, ys, "StackedSVGArea");

        const keys = ys;
        const stackedData = d3.stack().keys(keys)(sortedData);
        const colorScale = d3
            .scaleOrdinal()
            .domain(keys)
            .range(colors);

        // Line renderer
        const area = d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => xScale(d.data[x]))
            .y0((d) => yScale(d[0]))
            .y1((d) => yScale(d[1]));

        // Handle Canvas rendering
        if (canvas) {
            const context = canvas.getContext("2d");
            area.context(context);

            // Create the join to work out the areas we care about
            const join = d3
                .select(layer.current)
                .selectAll("path")
                .data(stackedData);
            context.clearRect(0, 0, width, height);

            join.enter().each((d) => {
                const color = colorScale(d.key);
                const fillColor = d3.color(color);
                fillColor.opacity = theme.opacity;
                const strokeColor = fillColor.darker();

                context.beginPath();
                area(d);
                context.fillStyle = fillColor;
                context.strokeStyle = strokeColor;
                context.fill();
                context.stroke();
            });

            return;
        }

        // Handle SVG rendering
        const join = d3
            .select(layer.current)
            .selectAll("path")
            .data(stackedData);

        join.style("fill", (d) => colorScale(d.key))
            .style("stroke", (d) => d3.color(colorScale(d.key)).darker())
            .style("opacity", theme.opacity)
            .style("pointer-events", "none")
            .transition("area")
            .duration(animationDuration)
            .delay((d, i) => (animationDuration / keys.length) * i)
            .ease(d3.easeCubicInOut)
            .attrTween("d", function(d) {
                const previous = d3.select(this).attr("d");
                const current = area(d);
                return interpolatePath(previous, current, (a, b) => {
                    return a.x === b.x && a.x === xScale.range()[1];
                });
            });
    }, [x, ys, sortedData, xScale, yScale, layer, animationDuration, theme.opacity]);

    // If possible respond to global mouse events for tooltips etc
    if (interactive) {
        useDatumFocus(dispatch, layer, x, ys, xScale, yScale, sortedData, eventMode, position, colors);
        useTooltip(dispatch, layer, x, ys, xScale, yScale, sortedData, eventMode, position, colors);
    }

    return null;
};

StackedAreaBase.propTypes = {
    ...plotsPropTypes,
    ...eventPropTypes,
    /**
     * The canvas element that the line chart should render to
     * @type {Object}
     */
    canvas: PropTypes.object,
};

StackedAreaBase.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

export { StackedAreaBase };
