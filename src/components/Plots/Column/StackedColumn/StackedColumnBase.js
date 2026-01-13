import * as d3 from "d3";
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
const StackedColumnBase = ({ x, ys, colors, onMouseOver, onMouseOut, onClick, layer, canvas, renderVirtualCanvas }) => {
    const [focused, setFocused] = useState(null);
    const dispatch = useDispatch();

    const data = useSelector((s) => chartSelectors.data(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, ys[0]));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const strokeColor = "#fff";

    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element).style("opacity", 1);
        const dropline = getDropline(selection, xScale);
        dispatch(eventActions.addDropline(dropline));

        // Clean up operations on exit
        return () => {
            selection.style("opacity", 0.8);
            dispatch(eventActions.removeDropline(dropline));
        };
    }, [dispatch, focused, xScale]);

    useRender(() => {
        if (ensureBandScale(xScale, "StackedColumnBase") === false) return null;
        ensureValuesAreUnique(data, x, "StackedColumnBase");
        ensureNoScaleOverflow(yScale, data, ys, "StackedColumnBase");

        // Create the stacked variant of the data
        const keys = ys;
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
            .selectAll(".column")
            .data((d) => d);

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "column")
            .attr("x", (d) => xScale(d.data[x]))
            .attr("y", () => yScale.range()[0])
            .attr("height", 0)
            .attr("width", xScale.bandwidth())
            .style("fill", (d, i, elements) => d3.select(elements[i].parentNode).attr("fill"))
            .style("stroke", strokeColor)
            .style("opacity", 0.8);

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
            .attr("x", (d) => xScale(d.data[x]))
            .attr("width", xScale.bandwidth())
            .style("fill", (d, i, elements) => d3.select(elements[i].parentNode).attr("fill"))
            .transition("height")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
            .attr("y", (d) => yScale(d[1]));

        renderCanvas({ canvas, renderVirtualCanvas, width, height, update });
    }, [x, ys, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
};

StackedColumnBase.propTypes = {
    ...plotsPropTypes,
    ...eventPropTypes,
};

StackedColumnBase.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

export { StackedColumnBase };
