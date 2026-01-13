import * as d3 from "@d3-chart/d3";
import { IColor, IDatum, IEventPlotProps, INumericValue } from "@d3-chart/types";
import type { Selection, Transition } from "@d3-chart/d3";
import { useSelector, useStore } from "react-redux";

import { useFocused } from "./useFocused";
import { useTooltip } from "./useTooltip";

import { chartSelectors, IState } from "../../../../store";
import { useLegendItem, useRender } from "../../../../hooks";
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
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: Transition<Element, unknown, any, unknown>) => void;
}

/**
 * Represents a base Scatter plot that is common across both SVG and Canvas based charts
 * @param  props       The set of React properties
 * @return             The Scatter plot component
 */
export function ScatterBase({
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
}: IScatterBaseProps) {
    const store = useStore();
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y));
    const zScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, z));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    const strokeColor = fillColor.darker();
    fillColor.opacity = theme.series.opacity;

    // @ts-expect-error: scale.bandwidth() is an optional call here
    const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0;

    useLegendItem(y, "circle", fillColor);
    const setFocused = useFocused(store.dispatch, xScale, yScale);
    const setTooltip = useTooltip(store.dispatch, x, y);

    // This is the main render function
    useRender(() => {
        // D3 data join
        // prettier-ignore
        const join = d3.select(layer.current)
            .selectAll("circle")
            .data(data.filter((d) => d[y] !== null && d[y] !== undefined)) as Selection<SVGCircleElement, IDatum, Element, unknown>;

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
            .attr("cx", (d) => xScale(d[x] as INumericValue) + bandwidth)
            .attr("cy", (d) => yScale(d[y] as INumericValue))
            .attr("r", 0)
            .style("stroke", () => strokeColor.toString())
            .style("fill", () => fillColor.toString())
            .style("opacity", theme.series.opacity);

        // Update new and existing points
        const update = enter // @ts-ignore
            .merge(join)
            .on("mouseover", function (event, datum) {
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this, event);
                setTooltip({ datum, event, fillColor: fillColor as unknown as IColor });
                setFocused({ element: this, event, datum });
            })
            .on("mouseout", function (event, datum) {
                if (!interactive) return;

                onMouseOut && onMouseOut(datum, this, event);
                setTooltip(null);
                setFocused(null);
            })
            .on("click", function (event, datum) {
                if (!interactive) return;

                onClick && onClick(datum, this, event);
            })
            .transition("scatter")
            .duration(animationDuration)
            .attr("cx", (d) => xScale(d[x] as INumericValue))
            .attr("cy", (d) => yScale(d[y] as INumericValue))
            .attr("r", (d) => (z ? zScale(d[z] as INumericValue) : radius))
            .style("fill", () => fillColor.toString());

        renderCanvas(canvas, renderVirtualCanvas, width, height, update, exit);
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
}
