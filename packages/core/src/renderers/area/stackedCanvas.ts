import * as d3 from "@chart-io/d3";
import type { Selection, Transition } from "@chart-io/d3";
import {
    IColor,
    IDatum,
    IScale,
    IEventPlotProps,
    INumericValue,
    IData,
    ITheme,
    IOnClick,
    IOnMouseOut,
    IOnMouseOver,
    IBandwidthScale,
} from "@chart-io/types";

import { ensureNoScaleOverflow, interpolateMultiPath, isNullOrUndefined } from "../../utils";
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
}

/**
 * Helper function to render a stacked area plot to canvas
 */
export function stackedCanvas({
    x,
    ys,
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
        .curve(d3.curveLinear)
        // @ts-ignore: TODO: Not sure how to fix this
        .x((d) => xScale(d.data[x]) + bandwidth)
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));

    const context = canvas.getContext("2d");
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
}
