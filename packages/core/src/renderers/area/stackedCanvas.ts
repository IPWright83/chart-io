import * as d3 from "@chart-io/d3";
import { IBandwidthScale, IColor } from "@chart-io/types";
import type { CurveFactory } from "@chart-io/d3";

import { ensureNoScaleOverflow } from "../../utils";
import type { IRenderProps } from "../../types";

export interface IRenderCanvasStackedAreaPlotProps
    extends Omit<
        IRenderProps,
        "onClick" | "onMouseOut" | "onMouseOver" | "interactive" | "layer" | "animationDuration" | "y"
    > {
    /**
     * The width of the plot
     */
    width?: number;
    /**
     * The height of the plot
     */
    height?: number;
    /**
     * The HTMLCanvasElement if we're rendering to a canvas
     */
    canvas?: HTMLCanvasElement;
    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;
    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
     /**
     * An optional D3 curve factory
     * See https://d3js.org/d3-shape/curve
     */
    curve?: CurveFactory;
}

/**
 * Helper function to render a stacked area plot to canvas
 */
export function stackedCanvas({
    x,
    ys,
    curve,
    xScale,
    yScale,
    data,
    colors,
    width,
    height,
    canvas,
    theme,
}: IRenderCanvasStackedAreaPlotProps) {
    if (!canvas) {
        return;
    }

    const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;
    ensureNoScaleOverflow(yScale, data, ys, "StackedSVGArea");

    // @ts-ignore: TODO: Not sure how to fix this
    const stackedData = d3.stack().keys(ys)(data);
    const colorScale = d3.scaleOrdinal().domain(ys).range(colors);

    const area = d3
        .area()
        // @ts-ignore: TODO: Not sure how to fix this
        .x((d) => xScale(d.data[x]) + bandwidth)
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));

    const context = canvas.getContext("2d");
    curve && area.curve(curve);
    area.context(context);

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
        area(d);

        context.fillStyle = fillColor.toString();
        context.strokeStyle = strokeColor.toString();
        context.fill();
        context.stroke();
    });

    // Return the paths which are used to calculate positions taking the
    // curveFactory into account. This is required for positioning tooltips
    // etc when we curves need to be taken into account
    if (curve) {
        // We can't use the area with the context, so we need to re-create
        // it unfortunately. Once a canvas has been provided this function
        // won't actually return a path
        return stackedData.map(data => ({
            key: data.key,
            path: d3
                .area()
                .curve(curve)
                .x((d) => xScale(d.data[x]) + bandwidth)
                .y0((d) => yScale(d[0]))
                .y1((d) => yScale(d[1]))
                (data),
        }));

        return result;
    }
}
