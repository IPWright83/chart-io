import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useStore, useSelector } from "react-redux";

import { IEventPlotProps } from "../../../../types";
import { useFocused } from "./useFocused";
import { useTooltip } from "./useTooltip";
import { chartSelectors, IStore } from "../../../../store";

import { renderCanvas } from "../../renderCanvas";

export interface IScatterBaseProps extends IEventPlotProps {
    /**
     * The optional key of the field used for the relative z size. This overrides the radius
     */
    z?: string;

    /**
     * The fixed radius to use for points. This is ignored if z is provided
     */
    radius?: number;
}

/**
 * Represents a base Scatter plot that is common across both SVG and Canvas based charts
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Scatter plot component
 */
export const ScatterBase = ({
    x,
    y,
    z,
    canvas,
    renderVirtualCanvas,
    radius = 5,
    color,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
}) => {
    const store = useStore();
    const data = useSelector((s: IStore) => chartSelectors.data(s));
    const width = useSelector((s: IStore) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IStore) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s: IStore) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s: IStore) => chartSelectors.scales.getScale(s, y));
    const zScale = useSelector((s: IStore) => chartSelectors.scales.getScale(s, z));
    const theme = useSelector((s: IStore) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IStore) => chartSelectors.animationDuration(s));

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    const fillColor = d3.color(color || theme.series.colors[0]);
    const strokeColor = fillColor.darker();
    fillColor.opacity = theme.series.opacity;

    const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0;

    const setFocused = useFocused({ dispatch: store.dispatch, xScale, yScale });
    const setTooltip = useTooltip({ dispatch: store.dispatch, x, y });

    // This is the main render function
    useEffect(() => {
        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll("circle")
            .data(data.filter((d) => d[y] !== null && d[y] !== undefined));

        // Exit points
        // prettier-ignore
        const exit = join
            .exit()
            .transition("scatter")
            .duration(animationDuration)
            .attr("r", 0)
            .remove();

        // Enter in new points
        const enter = join
            .enter()
            .append("circle")
            .attr("class", "scatter-point")
            .attr("cx", (d) => xScale(d[x]) + bandwidth)
            .attr("cy", (d) => yScale(d[y]))
            .attr("r", 0)
            .style("stroke", () => strokeColor.toString())
            .style("fill", () => fillColor.toString())
            .style("opacity", theme.series.opacity);

        // Update new and existing points
        const update = enter
            .merge(join)
            .on("mouseover", function (event, datum) {
                if (!interactive) return;

                onMouseOver(datum, this, event);
                setTooltip({ datum, event, fillColor });
                setFocused({ element: this, event, datum });
            })
            .on("mouseout", function (event, datum) {
                if (!interactive) return;

                onMouseOut(datum, this, event);
                setTooltip(null);
                setFocused(null);
            })
            .on("click", function (event, datum) {
                if (!interactive) return;

                onClick(datum, this, event);
            })
            .transition("scatter")
            .duration(animationDuration)
            .attr("cx", (d) => xScale(d[x]))
            .attr("cy", (d) => yScale(d[y]))
            .attr("r", (d) => (z ? zScale(d[z]) : radius))
            .style("fill", () => fillColor.toString());

        renderCanvas({
            canvas,
            renderVirtualCanvas,
            width,
            height,
            exit,
            update,
        });
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
    ]);

    return null;
};
