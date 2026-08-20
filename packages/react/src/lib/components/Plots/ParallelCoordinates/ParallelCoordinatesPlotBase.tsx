import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IDatum, IOnClick, IOnMouseOut, IOnMouseOver, IValue } from "@chart-io/core";

import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../hooks";

import { interpolatePoints } from "../interpolatePoints";
import { renderCanvas } from "../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { IParallelCoordinatesRow, useParallelCoordinatesLayout } from "./useParallelCoordinatesLayout";

// How much a row's line is faded when at least one axis is brushed and this row falls outside it -
// low enough that unselected rows read as background context rather than competing with the selection
const BRUSHED_OUT_OPACITY = 0.05;

export interface IParallelCoordinatesPlotBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;
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
 * Renders a `<ParallelCoordinates>`'s rows as polylines, one per row, with Canvas support. A plain
 * `<polyline>` (rather than an SVG `<path>`) is used for each row, since it's a straight-segment line
 * through a handful of known points, keeping the Canvas side a simple point list to walk (see
 * `renderPolyline`) rather than needing to parse/replay path commands.
 *
 * Only draws the lines - the axes (ticks, labels and brushes) are separate `<ParallelAxis>` components
 * rendered directly on the chart alongside this plot, the same way `<XYChart>` composes `<Line>`
 * with its own `<XAxis>`/`<YAxis>`, rather than a plot owning its own axes. Brush filtering is wired
 * up the same way: each `<ParallelAxis>` writes its brushed extent straight to the store via
 * `chartActions.setFilter`, and this plot reads every dimension's filter back via
 * `chartSelectors.filters` to work out which rows are currently selected - see `useParallelCoordinatesLayout`
 * for the row/line geometry itself
 * @param  props       The set of React properties
 * @return             The ParallelCoordinatesPlotBase component
 */
export function ParallelCoordinatesPlotBase({
    layer,
    canvas,
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
}: IParallelCoordinatesPlotBaseProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const chartLabeller = useSelector((s: IState) => chartSelectors.labeller(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const layout = useParallelCoordinatesLayout({ dimensions, name, color, colors });
    const rows: IParallelCoordinatesRow[] = layout.rows;
    const { legendKeys, legendColors } = layout;

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

    const formatValue = useCallback(
        (value: IValue, dimension: string) => (tickFormat ? tickFormat(value, dimension) : `${value}`),
        [tickFormat],
    );

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

    useRender(() => {
        if (!layer.current) return;

        const join = d3
            .select(layer.current)
            .selectAll<Element, IParallelCoordinatesRow>(".parallel-coordinates-line")
            .data(rows, (row) => row.key);

        join.exit().remove();

        const enter = join.enter().append("polyline").attr("class", "parallel-coordinates-line").style("fill", "none");

        const update = enter
            .merge(join as any)
            .style("stroke", (row) => row.color)
            .style("stroke-width", lineWidth)
            .style("opacity", (row) => (isSelected(row) ? theme.series.opacity : BRUSHED_OUT_OPACITY))
            .style("cursor", interactive ? "pointer" : "default")
            .on("mouseover", function (event, row) {
                // istanbul ignore next
                if (!interactive) return;
                handleMouseOver(row.datum, this, event);
            })
            .on("mouseout", function (event, row) {
                // istanbul ignore next
                if (!interactive) return;
                handleMouseOut(row.datum, this, event);
            })
            .on("click", function (event, row) {
                // istanbul ignore next
                if (!interactive) return;
                handleClick(row.datum, this, event);
            });

        const transition = update
            .transition("parallel-coordinates-line")
            .duration(animationDuration)
            .attrTween("points", function (row) {
                const target = row.points.map((p) => `${p.x},${p.y}`).join(" ");
                const previous = d3.select(this).attr("points") || target;
                return (t: number) => interpolatePoints(previous, target, t);
            });

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [rows, lineWidth, isSelected, interactive, canvas, renderVirtualCanvas, layer, width, height, animationDuration, theme, name, dimensions, chartLabeller, formatValue, onMouseOver, onMouseOut, onClick]);

    return null;
}
