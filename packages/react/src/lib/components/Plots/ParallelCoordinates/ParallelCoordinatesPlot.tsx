import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IDatum, IOnClick, IOnMouseOut, IOnMouseOver, IValue } from "@chart-io/core";

import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useLegendItems } from "../../../hooks";
import { withCanvas, withSVG } from "../../../hoc";

import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { ParallelCoordinatesAxis } from "./ParallelCoordinatesAxis";
import { IParallelCoordinatesLinesPlotProps, ParallelCoordinatesLinesPlot } from "./ParallelCoordinatesLinesPlot";
import { IParallelCoordinatesRow, useParallelCoordinatesLayout } from "./useParallelCoordinatesLayout";

const CanvasLinesPlot = withCanvas<IParallelCoordinatesLinesPlotProps>(
    ParallelCoordinatesLinesPlot,
    "plot parallel-coordinates-lines",
);
const SVGLinesPlot = withSVG<IParallelCoordinatesLinesPlotProps>(
    ParallelCoordinatesLinesPlot,
    "plot parallel-coordinates-lines",
);

export interface IParallelCoordinatesPlotProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
    /**
     * The ordered list of fields to plot, one vertical axis per field. Supports any number of
     * dimensions
     */
    dimensions: string[];
    /**
     * The key of the field used to label each row/line, shown in the tooltip. Falls back to the
     * row's index when omitted
     */
    name?: string;
    /**
     * The key of the field used to color each row/line categorically. Every row shares a single color
     * when omitted
     */
    color?: string;
    /**
     * The set of colors to use. Defaults to the theme's series colors
     */
    colors?: Array<IColor>;
    /**
     * The number of ticks to aim for on each axis
     * @default 5
     */
    ticks?: number;
    /**
     * Formats a tick's/tooltip's value for a given dimension
     * @default (value) => `${value}`
     */
    tickFormat?: (value: IValue, dimension: string) => string;
    /**
     * The width, in pixels, of each row's line
     * @default 1.5
     */
    lineWidth?: number;
    /**
     * Should each axis support brush filtering - dragging a range on an axis to fade out every row
     * that doesn't pass through it?
     * @default true
     */
    brushable?: boolean;
    /**
     * Called whenever the set of rows passing every brushed axis changes, including when nothing is
     * brushed (called with every row)
     */
    onBrush?: (rows: IDatum[]) => void;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    /**
     * Should this series feature in the Legend? Only meaningful when `color` is set - otherwise every
     * row shares one color and a legend has nothing distinct to show
     * @default false
     */
    showInLegend?: boolean;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a ParallelCoordinates plot: one polyline per row of `data`, connecting a point for each
 * field in `dimensions` across a set of independently-scaled vertical axes evenly spaced across the
 * plot. Used internally by `<ParallelCoordinates>` - use that unless you need to compose the plot into
 * a chart of your own.
 *
 * Computes the shared layout once (see `useParallelCoordinatesLayout`) and renders the lines and axes
 * separately, each with their own Canvas/SVG-or-always-SVG layer - the same way `<ChordPlot>` renders
 * its shapes/labels via `<ChordShapesPlot>`/`<LabelsPlot>`. Brush state (which axes are currently
 * filtering, and by how much) lives here rather than in the layout hook, since it's interaction state
 * rather than derived layout
 * @param  props       The set of React properties
 * @return             The ParallelCoordinatesPlot component
 */
export function ParallelCoordinatesPlot({
    useCanvas = false,
    dimensions,
    name,
    color,
    colors,
    ticks = 5,
    tickFormat,
    lineWidth = 1.5,
    brushable = true,
    onBrush,
    interactive = true,
    showInLegend = false,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IParallelCoordinatesPlotProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const chartLabeller = useSelector((s: IState) => chartSelectors.labeller(s));

    const { rows, xScale, scaleFor, axisTop, axisBottom, legendKeys, legendColors } = useParallelCoordinatesLayout({
        dimensions,
        name,
        color,
        colors,
    });

    useLegendItems(legendKeys, "line", showInLegend, legendColors);

    // Every currently brushed axis' pixel extent, keyed by dimension. A row is "selected" when its
    // pixel y-coordinate on every brushed axis falls within that axis' extent - comparing directly in
    // pixel space (rather than inverting each scale back to a data value) sidesteps the fact that band/
    // point scales have no well-defined invert()
    const [extents, setExtents] = useState<Record<string, [number, number]>>({});

    const handleBrushChange = useCallback((dimension: string, extent: [number, number] | null) => {
        setExtents((previous) => {
            if (!extent) {
                if (!(dimension in previous)) return previous;
                const next = { ...previous };
                delete next[dimension];
                return next;
            }
            return { ...previous, [dimension]: extent };
        });
    }, []);

    const isSelected = useCallback(
        (row: IParallelCoordinatesRow) =>
            Object.keys(extents).every((dimension) => {
                const [y0, y1] = extents[dimension];
                const y = row.valueAt[dimension];
                return y === undefined || (y >= y0 && y <= y1);
            }),
        [extents],
    );

    useEffect(() => {
        onBrush && onBrush(rows.filter(isSelected).map((row) => row.datum));
    }, [rows, isSelected, onBrush]);

    const formatValue = (value: IValue, dimension: string) => (tickFormat ? tickFormat(value, dimension) : `${value}`);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    const handleMouseOver = (datum: IDatum, element: Element, event: MouseEvent) => {
        const row = rows.find((r) => r.datum === datum);
        const rowLabel = name ? `${datum[name]}` : (row?.key ?? "");
        const summary = dimensions
            .map((dimension) => `${chartLabeller(dimension)}: ${formatValue(datum[dimension], dimension)}`)
            .join(", ");

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip &&
            onTooltip({
                datum,
                event,
                name: rowLabel,
                value: summary,
                color: (row?.color as IColor) ?? theme.series.colors[0],
            });
    };

    const handleMouseOut = (datum: IDatum, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleClick = (datum: IDatum, element: Element, event: MouseEvent) => {
        onClick && onClick(datum, element, event);
    };

    const Lines = useCanvas ? CanvasLinesPlot : SVGLinesPlot;

    return (
        <React.Fragment>
            <Lines
                renderVirtualCanvas={renderVirtualCanvas}
                rows={rows}
                lineWidth={lineWidth}
                isSelected={isSelected}
                interactive={interactive}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleClick}
            />
            {dimensions.map((dimension) => (
                <ParallelCoordinatesAxis
                    key={dimension}
                    dimension={dimension}
                    x={xScale(dimension)}
                    scale={scaleFor.get(dimension)}
                    axisTop={axisTop}
                    axisBottom={axisBottom}
                    ticks={ticks}
                    tickFormat={(value) => formatValue(value, dimension)}
                    label={chartLabeller(dimension)}
                    brushable={brushable}
                    onBrushChange={handleBrushChange}
                />
            ))}
        </React.Fragment>
    );
}

ParallelCoordinatesPlot.requiresVirtualCanvas = true;
ParallelCoordinatesPlot.isPlot = true;
