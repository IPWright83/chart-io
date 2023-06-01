import * as d3 from "@chart-it/d3";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { chartActions, chartSelectors, IState } from "../../../store";
import { logWarning } from "../../../utils";

export interface IHorizontalZoomBrushProps {
    /**
     * The child plots for the chart
     */
    plots?: JSX.Element[];

    /**
     * The height that the brush should be
     */
    height: number;
}

interface IScaleWithInvert {
    invert: any;
}

/**
 * Represents a Horizontal brush for zooming
 * @return The Horizontal Brush component
 */
export function HorizontalZoomBrush({ plots = [], height }: IHorizontalZoomBrushProps) {
    const x = plots.map((p) => p.props.x)[0];
    const ys = plots.flatMap((p) => p.props.y ?? p.props.ys);

    const brush = useRef();
    const dispatch = useDispatch();
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, "brush"));
    const margin = useSelector((s: IState) => chartSelectors.dimensions.margin(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.height(s));

    // Update the range, to be used by any plots that are set to use a brush
    // This allows us to shrink and re-use the plots within the brush
    useEffect(() => {
        dispatch(chartActions.setBrushRange(x, [margin.left, width - margin.right]));
    }, [x, width, margin.right, margin.left]);

    // Reserve some space for the brush if it's visible
    useEffect(() => {
        const reservedHeight = plots.length > 0 ? height : 0;
        dispatch(chartActions.setBrushReservedDimensions(0, reservedHeight));
    }, [height, plots]);

    useEffect(() => {
        ys.forEach((key) => dispatch(chartActions.setBrushRange(key, [height, 0])));
    }, [ys]);

    useEffect(() => {
        // prettier-ignore
        if (brush.current) {
            const left = margin.left;
            const right = Math.max(left, width - margin.right);

            const xBrush = d3
                .brushX()
                .extent([[left, 0], [right, height]])
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
    }, [dispatch, brush, width, height, margin.right, xScale]);

    // Clone each plot, as we need to re-render them within the brush
    // but ensure they don't trigger events, and they use the "brush" scale
    // to shrink them down to an appropriate size
    const plotClones = plots.map((plot, index) =>
        React.cloneElement(plot, { key: index, showInLegend: false, interactive: false, scaleMode: "brush" })
    );

    return (
        <>
            <g ref={brush} transform={`translate(0, ${plotHeight})`}>
                {plotClones}
            </g>
        </>
    );
}
