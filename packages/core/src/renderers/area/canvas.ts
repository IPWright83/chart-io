import * as d3 from "@chart-io/d3";
import type { IBandwidthScale, IColor } from "@chart-io/types";

import type { IRenderProps } from "../../types";
import { isNullOrUndefined } from "../../utils";

export interface IRenderCanvasAreaPlotProps
    extends Omit<
        IRenderProps,
        "onClick" | "onMouseOut" | "onMouseOver" | "interactive" | "layer" | "animationDuration" | "theme"
    > {
    /**
     * The key of the field used for the y2 position for a stream graph
     */
    y2?: string;
    /**
     * The color of the filled area
     */
    fillColor: IColor;
    /**
     * The color of the stroke area
     */
    strokeColor: IColor;
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
     * An optional D3 curve factory
     * See https://d3js.org/d3-shape/curve
     */
    curve?: CurveFactory;
}

/**
 * Helper function to render an area plot to canvas
 */
export function canvas({
    x,
    y,
    y2,
    width,
    height,
    canvas,
    xScale,
    yScale,
    data,
    fillColor,
    strokeColor,
    curve,
}: IRenderCanvasAreaPlotProps) {
    if (!canvas) {
        return;
    }

    const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;

    // Area renderer that starts at the 0 point
    const area = d3
        .area()
        .x((d) => xScale(d[x]) + bandwidth)
        .y0((d) => (y2 ? yScale(d[y]) : yScale.range()[0]))
        .y1((d) => (y2 ? yScale(d[y2]) : yScale(d[y])))
        .defined((d) => !isNullOrUndefined(d[y]));

    const context = canvas.getContext("2d");
    curve && area.curve(curve);
    area.context(context);

    // Clear and then re-render the path
    context.clearRect(0, 0, width, height);
    context.beginPath();

    // @ts-ignore: TODO: Not sure how to fix this
    area(data);

    context.fillStyle = fillColor.toString();
    context.strokeStyle = strokeColor.toString();
    context.fill();
    context.stroke();
}
