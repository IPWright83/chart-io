import * as d3 from "@chart-it/d3";
import React, { useRef } from "react";
import { useSelector, useStore } from "react-redux";
import type { IPlotProps } from "@chart-it/types";

import { chartSelectors, eventSelectors, IState } from "../../../../../store";
import { isNullOrUndefined, logDebug } from "../../../../../utils";

import { useLegendItem, useRender } from "../../../../../hooks";
import { useDatumFocus } from "../useDatumFocus";
import { useTooltip } from "../useTooltip";

export type ICanvasLineProps = Omit<IPlotProps, "interactive">;

/**
 * Represents a Line Plot on a Canvas element
 * @param  props       The set of React properties
 * @return             The Line plot component
 */
export function CanvasLine({ x, y, color, layer, canvas }: ICanvasLineProps) {
    const store = useStore();
    const gRef = useRef(null);
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y));
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));
    const seriesColor = color || theme.series.colors[0];

    // @ts-expect-error: We handle a missing bandwidth fine
    const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0;

    useLegendItem(y, "line", seriesColor);

    /* On future renders we want to update the path */
    useRender(() => {
        if (!canvas) {
            logDebug("Skipping render - canvas not yet avaliable");
            return null;
        }

        const context = canvas.getContext("2d");

        // We render canvas lines differently to SVG line in that
        // we use the generator provided by D3
        const line = d3
            .line()
            .x((d) => xScale(d[x]) + bandwidth)
            .y((d) => yScale(d[y]))
            .defined((d) => !isNullOrUndefined(d[y]))
            .context(context);

        // Clear and then re-render the path
        context.clearRect(0, 0, width, height);
        context.beginPath();

        // @ts-ignore: TODO: Need to work out casting
        line(sortedData);

        context.strokeStyle = `${seriesColor}`;
        context.stroke();

        // Note that because we've drawn directly to the canvas, there is no need
        // for us to use the canvas render loop
    }, [x, y, sortedData, xScale, yScale, layer, canvas, width, height]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus(store.dispatch, gRef, x, y, xScale, yScale, sortedData, eventMode, position, seriesColor);
    useTooltip(store.dispatch, gRef, x, y, xScale, yScale, sortedData, eventMode, position, seriesColor);

    return <g ref={gRef} />;
}
