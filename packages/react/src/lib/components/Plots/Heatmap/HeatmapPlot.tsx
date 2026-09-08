import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useCallback, useRef } from "react";
import { useSelector } from "react-redux";

import { withCanvas, withSVG } from "../../../hoc";
import { useColorLegend, useDatumContextMenu } from "../../../hooks";
import { IRectsPlotProps, RectsPlot } from "../RectsPlot";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { IHeatmapCell, useHeatmapLayout } from "./useHeatmapLayout";

const CanvasCellsPlot = withCanvas<IRectsPlotProps<IHeatmapCell>>(RectsPlot, "plot heatmap-cells");
const SVGCellsPlot = withSVG<IRectsPlotProps<IHeatmapCell>>(RectsPlot, "plot heatmap-cells");

const formatLegendValue = d3.format(",.2~f");

export interface IHeatmapPlotProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
    /**
     * The field used for each cell's row
     */
    rows: string;
    /**
     * The field used for each cell's column
     */
    columns: string;
    /**
     * The key of the field used for each cell's value, mapped to a color via `colors`
     */
    value: string;
    /**
     * The sequential color range a cell's `value` is mapped along - 2 or more colors, interpolated
     * between as equally spaced stops from the lowest to the highest value in the data. Defaults to a
     * 2-stop ramp from the theme's background to its first series color
     */
    colors?: IColor[];
    /**
     * The corner radius, in pixels, to apply to each cell
     * @default 0
     */
    cornerRadius?: number;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a Heatmap plot, a grid of cells - one per `rows`/`columns` combination in the data - colored
 * by `value`. Used internally by `<Heatmap>` - use that unless you need to compose the plot into a chart
 * of your own. `<Heatmap>` also renders a `<HeatmapAxes>` alongside this, which supplies the `<XAxis>`/
 * `<YAxis>` this plot's cells are positioned against
 *
 * Computes the row/column layout once (see `useHeatmapLayout`) and renders the cells via the generic
 * `<RectsPlot>`. In the full grid layout, also registers a color legend (see `useColorLegend`) that
 * renders as a gradient bar at the bottom of the chart's `<Legend>` - the same convention `<ZAxis>`
 * uses for its size legend - rather than a fixed element of its own. Every cell is keyed by its
 * row/column pair, so toggling `pivot` (see `<Heatmap>`) doesn't recreate anything - each cell
 * transitions to its new position, animating the grid collapsing into a bar chart along either axis
 * and back again
 * @param  props       The set of React properties
 * @return             The HeatmapPlot component
 */
export function HeatmapPlot({
    useCanvas = false,
    rows,
    columns,
    value,
    colors,
    cornerRadius = 0,
    interactive = true,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IHeatmapPlotProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const { pivot, cells, keyFor, xFor, yFor, widthFor, heightFor, colorFor, palette, colorDomain } = useHeatmapLayout({
        rows,
        columns,
        value,
        colors,
    });

    // Only shown in the full grid - once pivoted, cells stack into a stacked-bar chart rather than
    // being colored by value, so there's nothing left for a color legend to explain
    const isGrid = pivot === undefined;
    useColorLegend(isGrid ? palette : undefined, isGrid ? colorDomain : undefined, formatLegendValue);

    // Rounding every cell's corners is only right in the grid, where cells are visually distinct.
    // Once pivoted, cells sit edge-to-edge as segments of one bar - rounding each one's corners
    // individually leaves a visible rounded notch at every internal segment boundary
    const effectiveCornerRadius = isGrid ? cornerRadius : 0;

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);
    // Opens the same default datum `<ContextMenu>` (see `<ContextMenuOverlay>`) every other
    // interactive plot's left-click wires up - includes "Pivot", alongside "Hide data point" etc.,
    // since a pivotable Heatmap's cells are themselves the data points that menu opens on. Pivoting
    // itself only happens once the user actually selects "Pivot" from that menu (see
    // `createPivotAction`) - it used to also cycle instantly on the same click, but that raced the
    // menu opening: the layout had already changed by the time there was anything to choose from
    const onDatumContextMenu = useDatumContextMenu();

    // `<RectsPlot>` re-runs its whole D3 join (and restarts its position transition) whenever
    // `onMouseOver`/`onMouseOut`/`onClick` change identity - `useTooltip` in particular returns a
    // brand new function every render, so defining these plainly would recreate them (and so
    // interrupt/restart an in-flight pivot transition) on every incidental render, e.g. merely
    // hovering a different cell while the grid is still animating into its stacked-bar layout. A
    // ref keeps the latest values reachable without the callbacks themselves ever changing identity
    const latest = useRef({ onMouseOver, onMouseOut, onClick, onFocus, onTooltip, onDatumContextMenu, colorFor });
    latest.current = { onMouseOver, onMouseOut, onClick, onFocus, onTooltip, onDatumContextMenu, colorFor };

    const handleMouseOver = useCallback((cell: IHeatmapCell, element: Element, event: MouseEvent) => {
        const { onMouseOver, onFocus, onTooltip, colorFor } = latest.current;
        const color = colorFor(cell) as IColor;
        const name = `${cell.row} / ${cell.column}`;

        onMouseOver && onMouseOver(cell.datum, element, event);
        onFocus && onFocus({ element, event, datum: cell.datum });
        onTooltip && onTooltip({ datum: cell.datum, event, name, value: cell.value, color });
    }, []);

    const handleMouseOut = useCallback((cell: IHeatmapCell, element: Element, event: MouseEvent) => {
        const { onMouseOut, onFocus, onTooltip } = latest.current;
        onMouseOut && onMouseOut(cell.datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    }, []);

    const handleClick = useCallback((cell: IHeatmapCell, element: Element, event: MouseEvent) => {
        const { onClick, onDatumContextMenu } = latest.current;
        onClick && onClick(cell.datum, element, event);
        // Opens the datum menu, same as every other interactive plot's left-click - "Pivot" (see
        // `createPivotAction`) is one of its items, so the user picks it themselves rather than the
        // chart jumping straight to the next layout before they've had a chance to see the menu
        onDatumContextMenu(cell.datum, event);
    }, []);

    const Cells = useCanvas ? CanvasCellsPlot : SVGCellsPlot;

    // Also kept referentially stable (see `handleMouseOver` above) - an inline arrow here would
    // change identity on every render just the same, for the same "cursor" it always returns
    const cellCursor = useCallback(() => (interactive ? "pointer" : "default"), [interactive]);

    return (
        <Cells
            renderVirtualCanvas={renderVirtualCanvas}
            className="heatmap-cell"
            items={cells}
            keyFor={keyFor}
            x={xFor}
            y={yFor}
            width={widthFor}
            height={heightFor}
            color={colorFor}
            cornerRadius={effectiveCornerRadius}
            cursor={cellCursor}
            interactive={interactive}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        />
    );
}

HeatmapPlot.requiresVirtualCanvas = true;
HeatmapPlot.isPlot = true;
