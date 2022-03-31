import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";

import { useRender } from "../../../../../hooks";
import { chartSelectors, eventSelectors } from "../../../../../store";
import { plotDefaultProps, plotPropTypes } from "../../../../../types";
import { interpolateMultiPath, isNullOrUndefined } from "../../../../../utils";

import { useDatumFocus } from "../useDatumFocus";
import { usePathCreator } from "./usePathCreator";

/**
 * Represents a Line Plot on an SVG Element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
const SVGLine = ({ x, y, color, layer, canvas }) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const eventMode = useSelector((s) => eventSelectors.mode(s));
    const position = useSelector((s) => eventSelectors.position(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const seriesColor = color || theme.colors[0];
    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    // Used to create our initial path
    usePathCreator(layer, x, y, xScale, yScale);

    /* On future renders we want to update the path */
    useRender(() => {
        // Line renderer that starts at the 0 point
        const line = d3
            .line()
            .x((d) => xScale(d[x]))
            .y((d) => yScale(d[y]))
            .defined((d) => !isNullOrUndefined(d[y]));

        d3.select(layer.current)
            .select("path")
            .datum(sortedData)
            .transition("line")
            .duration(animationDuration)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");
                const current = line(d);
                return interpolateMultiPath(previous, current);
            })
            .style("stroke", seriesColor)
            .style("stroke-width", "2px");
    }, [x, y, sortedData, xScale, yScale, layer, animationDuration, canvas]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus(dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, seriesColor);

    return null;
};

SVGLine.propTypes = plotPropTypes;
SVGLine.defaultProps = plotDefaultProps;

export { SVGLine };
