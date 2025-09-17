import { IBandwidthScale, IColor } from "@chart-io/types";
import { d3 } from "../../d3";

import type { IRenderProps } from "../../types";
import { isNullOrUndefined } from "../../utils";

export interface IRenderCanvasLinePlotProps
    extends Omit<
        IRenderProps,
        "onClick" | "onMouseOut" | "onMouseOver" | "interactive" | "layer" | "animationDuration"
    > {
    /**
     * The color of each data point
     */
    color: IColor;
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
}

/**
 * Helper function to render a Line Plot to canvas
 */
export function canvas({
    x,
    y,
    width,
    height,
    canvas,
    xScale,
    yScale,
    data,
    color,
    theme,
}: IRenderCanvasLinePlotProps) {
    if (!canvas) {
        return;
    }

    const seriesColor = color || theme.series.colors[0];
    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));
    const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;

    // Line renderer that starts at the 0 point
    const line = d3
        .line()
        .x((d) => xScale(d[x]) + bandwidth)
        .y((d) => yScale(d[y]))
        .defined((d) => !isNullOrUndefined(d[y]));

    const context = canvas.getContext("2d");
    line.context(context);

    // Clear and then re-render the path
    context.clearRect(0, 0, width, height);
    context.beginPath();

    // @ts-ignore: TODO: Need to work out casting
    line(sortedData);

    context.strokeStyle = `${seriesColor}`;
    context.lineWidth = 2;
    context.stroke();

    // Note that because we've drawn directly to the canvas, there is no need
    // for us to use the canvas render loop
}
