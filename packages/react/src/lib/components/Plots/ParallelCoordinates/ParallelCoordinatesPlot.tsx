import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IDatum, IOnClick, IOnMouseOut, IOnMouseOver, IValue } from "@chart-io/core";

import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { useLegendItems } from "../../../hooks";

import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { ParallelCoordinatesLinesPlot } from "./ParallelCoordinatesLinesPlot";
import { IParallelCoordinatesRow, useParallelCoordinatesLayout } from "./useParallelCoordinatesLayout";

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
     * Formats a tooltip value for a given dimension. Also passed to each `<ParallelAxis>` to format
     * its ticks, so both stay consistent
     * @default (value) => `${value}`
     */
    tickFormat?: (value: IValue, dimension: string) => string;
    /**
     * The width, in pixels, of each row's line
     * @default 1.5
     */
    lineWidth?: number;
    /**
     * Called whenever the set of rows passing every brushed `<ParallelAxis>` changes, including when
     * nothing is brushed (called with every row)
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
 * Only draws the lines - the axes (ticks, labels and brushes) are separate `<ParallelAxis>` components
 * rendered directly on the chart alongside this plot, the same way `<XYChart>` composes `<Line>`
 * with its own `<XAxis>`/`<YAxis>`, rather than a plot owning its own axes. Brush filtering is wired
 * up the same way: each `<ParallelAxis>` writes its brushed extent straight to the store via
 * `chartActions.setFilter`, and this plot reads every dimension's filter back via
 * `chartSelectors.filters` to work out which rows are currently selected - see `useParallelCoordinatesLayout`
 * for the row/line geometry itself
 * @param  props       The set of React properties
 * @return             The ParallelCoordinatesPlot component
 */
export function ParallelCoordinatesPlot({
    useCanvas = false,
    dimensions,
    name,
    color,
    colors,
    tickFormat,
    lineWidth = 1.5,
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

    const { rows, legendKeys, legendColors } = useParallelCoordinatesLayout({ dimensions, name, color, colors });

    useLegendItems(legendKeys, "line", showInLegend, legendColors);

    // Every currently brushed axis' pixel extent, keyed by dimension - written directly to the store by
    // each <ParallelAxis>. A row is "selected" when its pixel y-coordinate on every brushed axis falls
    // within that axis' extent - comparing directly in pixel space (rather than inverting each scale
    // back to a data value) sidesteps the fact that band/point scales have no well-defined invert()
    const filters = useSelector((s: IState) => chartSelectors.filters.all(s)) as Record<string, [number, number]>;

    const isSelected = useCallback(
        (row: IParallelCoordinatesRow) =>
            Object.keys(filters).every((dimension) => {
                const extent = filters[dimension];
                if (!extent) return true;

                const [y0, y1] = extent;
                const y = row.valueAt[dimension];
                return y === undefined || (y >= y0 && y <= y1);
            }),
        [filters],
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

    return (
        <ParallelCoordinatesLinesPlot
            useCanvas={useCanvas}
            renderVirtualCanvas={renderVirtualCanvas}
            rows={rows}
            lineWidth={lineWidth}
            isSelected={isSelected}
            interactive={interactive}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        />
    );
}

ParallelCoordinatesPlot.requiresVirtualCanvas = true;
ParallelCoordinatesPlot.isPlot = true;
