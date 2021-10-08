import * as d3 from "d3";
import { interpolatePath } from "d3-interpolate-path";
import { useDispatch, useSelector } from "react-redux";

import { useRender } from "../../../../../hooks";
import { chartSelectors, eventSelectors } from "../../../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../../../types";
import { ensureNoScaleOverflow } from "../../../../../utils";

import { useDatumFocus } from "../useDatumFocus";
import { useMultiPathCreator } from "./useMultiPathCreator";

/**
 * Represents a stacked Area Plot on an SVG Element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
const StackedSVGArea = ({ x, ys, colors, layer }) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, ys[0]));
    const eventMode = useSelector((s) => eventSelectors.mode(s));
    const position = useSelector((s) => eventSelectors.position(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    // Used to create our initial path
    useMultiPathCreator(layer, x, ys, xScale, yScale);

    /* On future renders we want to update the path */
    useRender(async () => {
        ensureNoScaleOverflow(yScale, data, ys, "StackedSVGArea");

        const keys = ys;
        const stackedData = d3.stack().keys(keys)(sortedData);
        const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

        // Line renderer
        const area = d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => xScale(d.data[x]))
            .y0((d) => yScale(d[0]))
            .y1((d) => yScale(d[1]));

        const join = d3.select(layer.current).selectAll("path").data(stackedData);

        join.style("fill", (d) => colorScale(d.key))
            .style("stroke", (d) => colorScale(d.key))
            .style("fill-opacity", 0.8)
            .style("pointer-events", "none")
            .transition("area")
            .duration(animationDuration)
            .delay((d, i) => (animationDuration / keys.length) * i)
            .ease(d3.easeCubicInOut)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");
                const current = area(d);
                return interpolatePath(previous, current, (a, b) => {
                    return a.x === b.x && a.x === xScale.range()[1];
                });
            });
    }, [x, ys, sortedData, xScale, yScale, layer, animationDuration]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus(dispatch, layer, x, ys, xScale, yScale, sortedData, eventMode, position, colors);

    return null;
};

StackedSVGArea.propTypes = {
    ...plotsPropTypes,
    ...eventPropTypes,
};

StackedSVGArea.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

export { StackedSVGArea };
