import * as d3 from "d3";
import { useEffect, useState } from "react";
import { useStore, useSelector } from "react-redux";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventActions } from "../../../../store";
import { eventDefaultProps, eventPropTypes, plotsDefaultProps, plotsPropTypes } from "../../../../types";
import { ensureBandScale } from "../../../../utils";

import { renderCanvas } from "../../renderCanvas";
import { getDropline } from "../getDropline";
import { useTooltip } from "../useTooltip";

/**
 * Represents a Groupled Column Plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const GroupedColumnBase = ({
    x,
    ys,
    colors,
    interactive,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
    canvas,
    renderVirtualCanvas,
}) => {
    const [focused, setFocused] = useState(null);
    const store = useStore();

    const data = useSelector((s) => chartSelectors.data(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, ys[0]));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const strokeColor = theme.background;
    const setTooltip = useTooltip(store.dispatch, x);

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element).style("opacity", theme.series.selectedOpacity);
        const dropline = getDropline(selection, xScale, true);
        store.dispatch(eventActions.addDropline(dropline));

        // Clean up operations on exit
        return () => {
            selection.style("opacity", theme.series.opacity);
            store.dispatch(eventActions.removeDropline(dropline));
        };
    }, [store.dispatch, focused, xScale, theme.series.opacity, theme.series.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(xScale, "GroupedColumn") === false) return null;

        // Create a scale for each series to fit along the x-axis and the series colors
        const colorScale = d3.scaleOrdinal().domain(ys).range(colors);
        const x1Scale = d3.scaleBand().domain(ys).rangeRound([0, xScale.bandwidth()]).padding(0.05);

        const groupJoin = d3.select(layer.current).selectAll("g").data(data);

        // Clean up old groups
        groupJoin.exit().remove();

        const join = groupJoin
            .enter()
            .append("g")
            .merge(groupJoin)
            .selectAll(".column")
            .data((d) => ys.map((y) => ({ ...d, key: y, value: d[y] })));

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "column")
            .attr("x", (d) => xScale(d[x]) + x1Scale(d.key))
            .attr("y", () => yScale.range()[0])
            .attr("height", 0)
            .attr("width", x1Scale.bandwidth())
            .style("fill", (d) => colorScale(d.key))
            .style("stroke", strokeColor)
            .style("opacity", theme.series.opacity);

        const update = join
            .merge(enter)
            .on("mouseover", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this, event);
                setFocused({ element: this, event, datum });
                setTooltip({
                    datum,
                    event,
                    fillColors: [colorScale(datum.key)],
                    ys: [datum.key],
                });
            })
            .on("mouseout", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(datum, this, event);
                setFocused(null);
                setTooltip(null);
            })
            .on("click", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(datum, this, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            .attr("x", (d) => xScale(d[x]) + x1Scale(d.key))
            .attr("width", x1Scale.bandwidth())
            .style("fill", (d) => colorScale(d.key))
            .transition("height")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("height", (d) => yScale.range()[0] - yScale(d.value))
            .attr("y", (d) => yScale(d.value));

        renderCanvas({ canvas, renderVirtualCanvas, width, height, update });
    }, [x, ys, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
};

GroupedColumnBase.propTypes = {
    ...plotsPropTypes,
    ...eventPropTypes,
};

GroupedColumnBase.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
};

export { GroupedColumnBase };
