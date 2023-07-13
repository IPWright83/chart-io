import * as d3 from "@chart-io/d3";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMargin } from "@chart-io/types";

import { chartActions, chartSelectors, IState } from "../../../store";
import { childrenToArray, logWarning } from "../../../utils";
import { DEFAULT_BRUSH_MARGIN } from "../constants";

export interface IHorizontalZoomBrushProps {
    /**
     * The child plots for the chart
     */
    children?: JSX.Element | JSX.Element[];

    /**
     * The height that the brush should be
     */
    height: number;

    /**
     * The margin to apply around the brush
     * @default { left: 0, top: 10, right: 0, bottom: 10 }
     */
    margin?: IMargin;
}

interface IScaleWithInvert {
    invert: any;
}

/**
 * Represents a Horizontal brush for zooming
 * @return The Horizontal Brush component
 */
export function HorizontalZoomBrush({
    children,
    height = 60,
    margin = DEFAULT_BRUSH_MARGIN,
}: IHorizontalZoomBrushProps) {
    const plots = childrenToArray(children);

    const x = plots.map((p) => p.props.x)[0];
    const ys = plots.flatMap((p) => p.props.y ?? p.props.ys);

    const brush = useRef();
    const dispatch = useDispatch();
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, "brush"));
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const right = useSelector((s: IState) => chartSelectors.dimensions.plot.right(s));
    const bottom = useSelector((s: IState) => chartSelectors.dimensions.plot.bottom(s));
    const plotMargin = useSelector((s: IState) => chartSelectors.dimensions.plot.margin(s));

    // Update the range, to be used by any plots that are set to use a brush
    // This allows us to shrink and re-use the plots within the brush
    useEffect(() => {
        dispatch(chartActions.setBrushRange(x, [left, right]));
    }, [x, right, left]);

    // Reserve some space for the brush if it's visible
    useEffect(() => {
        const reservedHeight = plots.length > 0 ? height : 0;
        dispatch(chartActions.setBrushDimensions(0, reservedHeight, margin));
    }, [height, plots, margin]);

    useEffect(() => {
        ys.forEach((key) => dispatch(chartActions.setBrushRange(key, [height, 0])));
    }, [ys]);

    useEffect(() => {
        // prettier-ignore
        if (brush.current) {

            const xBrush = d3
                .brushX()
                .extent([[left, 0], [Math.max(left, right), height]])
                .on("end", event => {
                    const extent = event.selection;
    
                    // Clear the brush 
                    if (!extent || !xScale) {
                        dispatch(chartActions.setScaleZoom(x, undefined));    
                        return;
                    }

                    // Ensure this scale works properly
                    if (!(xScale as IScaleWithInvert).invert) {
                        logWarning("W007", "An incompatible scale was used with a <HorizontalBrush>");
                        return;
                    }

// var eachBand = self.yScale.step();
// var index = Math.round((d3.event.y / eachBand));
// var val = self.yScale.domain()[index];

                    // Calculate the new domain and then zoom
                    const domain = [
                        (xScale as IScaleWithInvert).invert(extent[0]), 
                        (xScale as IScaleWithInvert).invert(extent[1])
                    ];
                    dispatch(chartActions.setScaleZoom(x, domain));
                });

            d3.select(brush.current).call(xBrush);
        }
    }, [dispatch, brush, height, left, right, xScale]);

    // Clone each plot, as we need to re-render them within the brush
    // but ensure they don't trigger events, and they use the "brush" scale
    // to shrink them down to an appropriate size
    const plotClones = plots.map((plot, index) =>
        React.cloneElement(plot, { key: index, showInLegend: false, interactive: false, scaleMode: "brush" })
    );

    return (
        <>
            <g ref={brush} transform={`translate(${margin.left}, ${bottom + margin.top + plotMargin.bottom})`}>
                {plotClones}
            </g>
        </>
    );
}
