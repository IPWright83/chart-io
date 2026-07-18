import { chartSelectors, d3, ensureNoScaleOverflow, interpolateMultiPath, IState } from "@chart-io/core";
import type { IColor, IEventPlotProps } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { IBandwidthScale } from "../../IBandwidthScale";
import { useDatumFocus } from "./useDatumFocus";
import { useMultiPathCreator } from "./useMultiPathCreator";
import { useTooltip } from "./useTooltip";

export interface IStackedAreaBaseProps extends Omit<IEventPlotProps, "y"> {
    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;

    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
}

/**
 * Represents a stacked Area Plot on an SVG Element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
export function StackedAreaBase({
    x,
    ys,
    colors,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    layer,
    canvas,
}: IStackedAreaBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, ys[0], scaleMode));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const sortedData = useMemo(() => data.toSorted((a, b) => d3.ascending(a[x], b[x])), [data, x]);

    // Used to create our initial path
    useMultiPathCreator(layer, x, ys, xScale, yScale, canvas);
    useLegendItems(ys, "line", showInLegend, colors);

    /* On future renders we want to update the path */
    useRender(() => {
        const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;

        const areaShape = d3
            .area()
            .curve(d3.curveLinear)
            // @ts-ignore: TODO: Not sure how to fix this
            .x((d) => xScale(d.data[x]) + bandwidth)
            .y0((d) => yScale(d[0]))
            .y1((d) => yScale(d[1]));

        ensureNoScaleOverflow(yScale, sortedData, ys, "StackedSVGArea");

        // @ts-ignore: TODO: Not sure how to fix this
        const stackedData = d3.stack().keys(ys)(sortedData);
        const colorScale = d3.scaleOrdinal().domain(ys).range(colors);

        // Handle Canvas rendering
        if (canvas) {
            const context = canvas.getContext("2d");
            areaShape.context(context);

            // Create a join with a faux dom element to work out the areas we care about
            const join = d3.select(document.createElement("custom")).selectAll("path").data(stackedData);

            context.clearRect(0, 0, width, height);

            join.enter().each((d) => {
                const color = colorScale(d.key);
                const fillColor = d3.color(color.toString());
                fillColor.opacity = theme.series.opacity;
                const strokeColor = fillColor.darker();

                context.beginPath();

                // @ts-ignore: TODO: Not sure how to fix this
                areaShape(d);

                context.fillStyle = fillColor.toString();
                context.strokeStyle = strokeColor.toString();
                context.fill();
                context.stroke();
            });

            return;
        }

        if (!layer.current) {
            return;
        }

        const join = d3.select(layer.current).selectAll("path").data(stackedData);

        join.style("fill", (d) => colorScale(d.key).toString())
            .style("stroke", (d) => d3.color(colorScale(d.key).toString()).darker().toString())
            .style("opacity", theme.series.opacity)
            .style("pointer-events", "none")
            .transition("area")
            .duration(animationDuration)
            .ease(d3.easeCubicInOut)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");
                // @ts-ignore: TODO: Not sure how to fix this
                const current = areaShape(d);
                return interpolateMultiPath(previous, current);
            });
    }, [x, ys, sortedData, xScale, yScale, layer, animationDuration, theme.series.opacity]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus({ interactive, x, ys, xScale, yScale, data: sortedData, colors });
    useTooltip({ x, ys, xScale, yScale, data: sortedData, colors, interactive });

    return null;
}
