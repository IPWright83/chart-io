import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventActions } from "../../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../../types";
import { ensureBandScale } from "../../../../utils";

import { renderCanvas } from "../../renderCanvas";
import { getDropline } from "../getDropline";
import { useTooltip } from "../useTooltip";

/**
 * Represents a Column Plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const GroupedBarBase = ({
    xs,
    y,
    colors,
    opacity,
    interactive,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
    canvas,
    renderVirtualCanvas,
}) => {
    const [focused, setFocused] = useState(null);
    const dispatch = useDispatch();

    const data = useSelector((s) => chartSelectors.data(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, xs[0]));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const strokeColor = "#fff";
    const setTooltip = useTooltip({ dispatch, y });

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element).style("opacity", theme.selectedOpacity);
        const dropline = getDropline(selection, yScale, true);
        dispatch(eventActions.addDropline(dropline));

        // Clean up operations on exit
        return () => {
            selection.style("opacity", opacity ?? theme.opacity);
            dispatch(eventActions.removeDropline(dropline));
        };
    }, [dispatch, focused, yScale, theme.opacity, theme.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(yScale, "GroupedBar") === false) return null;

        // Create a scale for each series to fit along the x-axis and the series colors
        const colorScale = d3.scaleOrdinal().domain(xs).range(colors);
        const y1Scale = d3.scaleBand().domain(xs).rangeRound([0, yScale.bandwidth()]).padding(0.05);

        const groupJoin = d3.select(layer.current).selectAll("g").data(data);

        // Clean up old groups
        groupJoin.exit().remove();

        const join = groupJoin
            .enter()
            .append("g")
            .merge(groupJoin)
            .selectAll(".bar")
            .data((d) => xs.map((x) => ({ ...d, key: x, value: d[x] })));

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", (d) => yScale(d[y]) + y1Scale(d.key))
            .attr("x", () => xScale.range()[0])
            .attr("width", 0)
            .attr("height", y1Scale.bandwidth())
            .style("stroke", strokeColor)
            .style("fill", (d) => colorScale(d.key))
            .style("opacity", opacity ?? theme.opacity);

        const update = join
            .merge(enter)
            .on("mouseover", function (event, datum) {
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this, event);
                setFocused({ element: this, event, datum });
                setTooltip({
                    datum,
                    event,
                    fillColors: [colorScale(datum.key)],
                    xs: [datum.key],
                });
            })
            .on("mouseout", function (event, datum) {
                if (!interactive) return;

                onMouseOut && onMouseOut(datum, this, event);
                setFocused(null);
                setTooltip(null);
            })
            .on("click", function (event, datum) {
                if (!interactive) return;

                onClick && onClick(datum, this, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            .attr("y", (d) => yScale(d[y]) + y1Scale(d.key))
            .attr("height", y1Scale.bandwidth())
            .style("fill", (d) => colorScale(d.key))
            .transition("width")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("width", (d) => xScale(d.value) - xScale.range()[0])
            .attr("x", () => xScale.range()[0]);

        renderCanvas({ canvas, renderVirtualCanvas, width, height, update });
    }, [y, xs, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
};

const plotsPropTypesClone = {
    ...plotsPropTypes,

    /**
     * The set of x fields to use to access the data for each plot
     * @type {[type]}
     */
    xs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

delete plotsPropTypesClone.x;
delete plotsPropTypesClone.ys;

GroupedBarBase.propTypes = {
    ...plotsPropTypesClone,
    ...eventPropTypes,
};

GroupedBarBase.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

export { GroupedBarBase };
