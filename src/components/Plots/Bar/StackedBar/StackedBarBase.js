import "./StackedBar.css";

import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventActions } from "../../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../../types";
import { ensureBandScale, ensureNoScaleOverflow, ensureValuesAreUnique } from "../../../../utils";

import { renderCanvas } from "../../renderCanvas";
import { getDropline } from "../getDropline";

/**
 * Represents a Column Plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const StackedBarBase = ({ xs, y, colors, onMouseOver, onMouseOut, onClick, layer, canvas, renderVirtualCanvas }) => {
    const [focused, setFocused] = useState(null);
    const dispatch = useDispatch();

    const data = useSelector((s) => chartSelectors.data(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, xs[0]));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element).style("opacity", 1);
        const dropline = getDropline(selection, yScale, false);
        dispatch(eventActions.addDropline(dropline));

        // Clean up operations on exit
        return () => {
            selection.style("opacity", undefined);
            dispatch(eventActions.removeDropline(dropline));
        };
    }, [dispatch, focused, yScale, theme.opacity, theme.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(yScale, "StackedBar") === false) return null;
        ensureValuesAreUnique(data, y, "StackedBar");
        ensureNoScaleOverflow(xScale, data, xs, "StackedBar");

        // Create the stacked variant of the data
        const keys = xs;
        const stackedData = d3.stack().keys(keys)(data);
        const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

        const groupJoin = d3.select(layer.current).selectAll("g").data(stackedData);

        // Clean up old stacks
        groupJoin.exit().remove();

        const join = groupJoin
            .enter()
            .append("g")
            .attr("fill", (d) => colorScale(d.key))
            .merge(groupJoin)
            .selectAll(".bar")
            .data((d) => d);

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", () => xScale.range()[0])
            .attr("y", (d) => yScale(d.data[y]))
            .attr("height", yScale.bandwidth())
            .attr("width", 0)
            .style("fill", (d, i, elements) => d3.select(elements[i].parentNode).attr("fill"));

        const update = join
            .merge(enter)
            .on("mouseover", function (event, d) {
                onMouseOver && onMouseOver(d.data, this, event);
                setFocused({ element: this, event, datum: d.data });
            })
            .on("mouseout", function (event, d) {
                onMouseOut && onMouseOut(d.data, this, event);
                setFocused(null);
            })
            .on("click", function (event, d) {
                onClick && onClick(d.data, this, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            .style("fill", (d, i, elements) => d3.select(elements[i].parentNode).attr("fill"))
            .attr("y", (d) => yScale(d.data[y]))
            .attr("height", () => yScale.bandwidth())
            .transition("width")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
            .attr("x", (d) => xScale(d[0]));

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

delete plotsPropTypesClone.ys;
delete plotsPropTypesClone.x;

StackedBarBase.propTypes = {
    ...plotsPropTypesClone,
    ...eventPropTypes,
};

StackedBarBase.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

export { StackedBarBase };
