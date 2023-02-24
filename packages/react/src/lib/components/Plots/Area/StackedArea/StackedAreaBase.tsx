import * as d3 from "@d3-chart/d3";
import type { IEventPlotProps, IColor } from "@d3-chart/types";

import { interpolatePath } from "d3-interpolate-path";
import { useStore, useSelector } from "react-redux";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventSelectors, IState } from "../../../../store";
import { ensureNoScaleOverflow } from "../../../../utils";

import { useDatumFocus } from "./useDatumFocus";
import { useTooltip } from "./useTooltip";
import { useMultiPathCreator } from "./useMultiPathCreator";

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
export function StackedAreaBase({ x, ys, colors, interactive = true, layer, canvas }: IStackedAreaBaseProps) {
    const store = useStore();
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, ys[0]));
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    // Used to create our initial path
    useMultiPathCreator(layer, x, ys, xScale, yScale, canvas);

    /* On future renders we want to update the path */
    useRender(async () => {
        ensureNoScaleOverflow(yScale, data, ys, "StackedSVGArea");

        const keys = ys;

        // @ts-ignore: TODO: Not sure how to fix this
        const stackedData = d3.stack().keys(keys)(sortedData);
        const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

        // Line renderer
        const area = d3
            .area()
            .curve(d3.curveLinear)
            // @ts-ignore: TODO: Not sure how to fix this
            .x((d) => xScale(d.data[x]))
            .y0((d) => yScale(d[0]))
            .y1((d) => yScale(d[1]));

        // Handle Canvas rendering
        if (canvas) {
            const context = canvas.getContext("2d");
            area.context(context);

            // Create the join to work out the areas we care about
            const join = d3.select(layer.current).selectAll("path").data(stackedData);
            context.clearRect(0, 0, width, height);

            join.enter().each((d) => {
                const color = colorScale(d.key);
                const fillColor = d3.color(color.toString());
                fillColor.opacity = theme.series.opacity;
                const strokeColor = fillColor.darker();

                context.beginPath();

                // @ts-ignore: TODO: Not sure how to fix this
                area(d);

                context.fillStyle = fillColor.toString();
                context.strokeStyle = strokeColor.toString();
                context.fill();
                context.stroke();
            });

            return;
        }

        // Handle SVG rendering
        const join = d3.select(layer.current).selectAll("path").data(stackedData);

        join.style("fill", (d) => colorScale(d.key).toString())
            .style("stroke", (d) => d3.color(colorScale(d.key).toString()).darker().toString())
            .style("opacity", theme.series.opacity)
            .style("pointer-events", "none")
            .transition("area")
            .duration(animationDuration)
            .delay((d, i) => (animationDuration / keys.length) * i)
            .ease(d3.easeCubicInOut)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");

                // @ts-ignore: TODO: Not sure how to fix this
                const current = area(d);

                return interpolatePath(previous, current, (a, b) => {
                    return a.x === b.x && a.x === xScale.range()[1];
                });
            });
    }, [x, ys, sortedData, xScale, yScale, layer, animationDuration, theme.series.opacity]);

    // If possible respond to global mouse events for tooltips etc
    if (interactive) {
        useDatumFocus(store.dispatch, layer, x, ys, xScale, yScale, sortedData, eventMode, position, colors);
        useTooltip(store.dispatch, layer, x, ys, xScale, yScale, sortedData, eventMode, position, colors);
    }

    return null;
}
