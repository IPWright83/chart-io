import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";

import { useRender } from "../../../../../hooks";
import { chartSelectors, eventSelectors } from "../../../../../store";
import { plotDefaultProps, plotPropTypes } from "../../../../../types";
import { interpolateMultiPath, isNullOrUndefined } from "../../../../../utils";

import { useDatumFocus } from "../useDatumFocus";
import { usePathCreator } from "./usePathCreator";

/**
 * Represents an Area Plot on an SVG Element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
const SVGArea = ({ x, y, y2, color, layer }) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const eventMode = useSelector((s) => eventSelectors.mode(s));
    const position = useSelector((s) => eventSelectors.position(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    // Used to create our initial path
    usePathCreator(layer, x, y, xScale, yScale);

    /* On future renders we want to update the path */
    useRender(() => {
        // Area renderer that starts at the 0 point
        const area = d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => xScale(d[x]))
            .y0((d) => (y2 ? yScale(d[y]) : yScale.range()[0]))
            .y1((d) => {
                if (y2) {
                    return yScale(d[y] + d[y2]);
                }
                return yScale(d[y]);
            })
            .defined((d) => !isNullOrUndefined(d[y]));

        d3.select(layer.current)
            .select("path")
            .datum(sortedData)
            .style("fill", color || theme.colors[0])
            .style("stroke", color || theme.colors[0])
            .style("fill-opacity", 0.8)
            .style("pointer-events", "none")
            .transition("area")
            .duration(animationDuration)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");
                const current = area(d);
                return interpolateMultiPath(previous, current);
            });
    }, [x, y, sortedData, xScale, yScale, layer, animationDuration]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus(dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, color || theme.colors[0]);

    return null;
};

SVGArea.propTypes = plotPropTypes;
SVGArea.defaultProps = plotDefaultProps;

export { SVGArea };
