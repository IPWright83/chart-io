import * as d3 from "d3";
import { useEffect, useState } from "react";
import { useStore, useSelector } from "react-redux";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventActions } from "../../../../store";
import { eventDefaultProps, eventPropTypes, plotDefaultProps, plotPropTypes } from "../../../../types";
import { ensureBandScale, ensureValuesAreUnique } from "../../../../utils";

import { renderCanvas } from "../../renderCanvas";
import { getDropline } from "../getDropline";
import { useTooltip } from "../useTooltip";

/**
 * Represents a Column Plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const ColumnBase = ({
    x,
    y,
    canvas,
    renderVirtualCanvas,
    color,
    interactive,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
}) => {
    const [focused, setFocused] = useState(null);
    const store = useStore();

    const data = useSelector((s) => chartSelectors.data(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    const strokeColor = theme.background;
    const fillColor = d3.color(color || theme.series.colors[0]);
    fillColor.opacity = theme.series.opacity;

    const setTooltip = useTooltip(store.dispatch, x);

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
    }, [store.dispatch, focused, xScale, theme.series.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(xScale, "Column") === false) return null;
        ensureValuesAreUnique(data, x, "Column");

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll(".column")
            .data(data, (d) => d[x]);

        // Exit bars
        join.exit().remove();

        // Enter bars
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "column")
            .attr("x", (d) => xScale(d[x]))
            .attr("y", () => yScale.range()[0])
            .attr("width", () => xScale.bandwidth())
            .attr("height", 0)
            .style("stroke", strokeColor)
            .style("fill", fillColor);

        // Update new and existing points
        const update = enter
            .merge(join)
            .on("mouseover", function (event, datum) {
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this, event);
                setFocused({ element: this, event, datum });
                setTooltip({ datum, event, fillColors: [fillColor], ys: [y] });
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
            .attr("x", (d) => xScale(d[x]))
            .attr("width", () => xScale.bandwidth())
            .style("fill", fillColor)
            .transition("height")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("y", (d) => yScale(d[y]))
            .attr("height", (d) => yScale.range()[0] - yScale(d[y]));

        renderCanvas({ canvas, renderVirtualCanvas, width, height, update });
    }, [
        x,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        xScale,
        yScale,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        color,
        height,
        width,
    ]);

    return null;
};

ColumnBase.propTypes = {
    ...plotPropTypes,
    ...eventPropTypes,
};

ColumnBase.defaultProps = {
    ...plotDefaultProps,
    ...eventDefaultProps,
};

export { ColumnBase };
