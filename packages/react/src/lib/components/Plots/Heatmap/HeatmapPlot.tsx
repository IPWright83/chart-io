import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { withCanvas, withSVG } from "../../../hoc";
import { ICellsPlotProps, CellsPlot } from "../CellsPlot";
import { ILabelsPlotProps, LabelsPlot } from "../LabelsPlot";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { IHeatmapAxisLabel, IHeatmapCell, useHeatmapLayout } from "./useHeatmapLayout";

const CanvasCellsPlot = withCanvas<ICellsPlotProps<IHeatmapCell>>(CellsPlot, "plot heatmap-cells");
const SVGCellsPlot = withSVG<ICellsPlotProps<IHeatmapCell>>(CellsPlot, "plot heatmap-cells");
const CanvasLabelsPlot = withCanvas<ILabelsPlotProps<IHeatmapAxisLabel>>(LabelsPlot, "plot heatmap-labels");
const SVGLabelsPlot = withSVG<ILabelsPlotProps<IHeatmapAxisLabel>>(LabelsPlot, "plot heatmap-labels");

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
     * The gap, in pixels, to leave between adjacent cells
     * @default 2
     */
    padding?: number;
    /**
     * The corner radius, in pixels, to apply to each cell
     * @default 0
     */
    cornerRadius?: number;
    /**
     * A field giving each row's group. When set, `rowsGrouped` can reorder rows so rows sharing a
     * group become adjacent
     */
    rowGroupBy?: string;
    /**
     * A field giving each column's group. When set, `columnsGrouped` can reorder columns so columns
     * sharing a group become adjacent
     */
    columnGroupBy?: string;
    /**
     * The gap, in pixels, left between two adjacent groups when `rowsGrouped`/`columnsGrouped` is set -
     * on top of (not instead of) `padding`, so groups read as visually distinct clusters
     * @default padding * 6
     */
    groupGap?: number;
    /**
     * Reorders rows so that rows sharing a `rowGroupBy` group become adjacent, groups ordered by where
     * they first appear in the data - rows within a group keep their original relative order. Existing
     * cells transition smoothly to their new row position when this changes. No effect without
     * `rowGroupBy`
     * @default false
     */
    rowsGrouped?: boolean;
    /**
     * The column equivalent of `rowsGrouped` - reorders columns so columns sharing a `columnGroupBy`
     * group become adjacent. No effect without `columnGroupBy`
     * @default false
     */
    columnsGrouped?: boolean;
    /**
     * Should row and column labels be shown?
     * @default true
     */
    labels?: boolean;
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
 * of your own
 *
 * Computes the row/column layout once (see `useHeatmapLayout`) and renders the cells and row/column
 * labels via the generic `<CellsPlot>`/`<LabelsPlot>` components, each with its own Canvas/SVG layer -
 * the same way a `<Dendrogram>` composes `<LinksPlot>`/`<NodesPlot>`/`<LabelsPlot>`. Cells are keyed by
 * their row/column pair, so toggling `rowsGrouped`/`columnsGrouped` doesn't re-create them - it just
 * transitions each one to its new position, animating the regrouping
 * @param  props       The set of React properties
 * @return             The HeatmapPlot component
 */
export function HeatmapPlot({
    useCanvas = false,
    rows,
    columns,
    value,
    colors,
    padding = 2,
    cornerRadius = 0,
    rowGroupBy,
    columnGroupBy,
    groupGap,
    rowsGrouped = false,
    columnsGrouped = false,
    labels = true,
    interactive = true,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IHeatmapPlotProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const { cells, keyFor, xFor, yFor, widthFor, heightFor, colorFor, rowLabels, columnLabels, plotLeft, plotTop } = useHeatmapLayout({
        rows,
        columns,
        value,
        colors,
        padding,
        rowGroupBy,
        columnGroupBy,
        groupGap: groupGap ?? padding * 6,
        rowsGrouped,
        columnsGrouped,
    });

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    const handleMouseOver = (cell: IHeatmapCell, element: Element, event: MouseEvent) => {
        const color = colorFor(cell) as IColor;
        const name = `${cell.row} / ${cell.column}`;

        onMouseOver && onMouseOver(cell.datum, element, event);
        onFocus && onFocus({ element, event, datum: cell.datum });
        onTooltip && onTooltip({ datum: cell.datum, event, name, value: cell.value, color });
    };

    const handleMouseOut = (cell: IHeatmapCell, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(cell.datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleClick = (cell: IHeatmapCell, element: Element, event: MouseEvent) => {
        onClick && onClick(cell.datum, element, event);
    };

    const Cells = useCanvas ? CanvasCellsPlot : SVGCellsPlot;
    const Labels = useCanvas ? CanvasLabelsPlot : SVGLabelsPlot;

    return (
        <React.Fragment>
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
                cornerRadius={cornerRadius}
                cursor={() => (interactive ? "pointer" : "default")}
                interactive={interactive}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleClick}
            />
            <Labels
                className="heatmap-row-label"
                items={labels ? rowLabels : []}
                keyFor={(label) => label.value}
                x={() => plotLeft - 8}
                y={(label) => label.center}
                text={(label) => label.value}
                textAnchor={() => "end"}
                color={theme.label.color.toString()}
                fontSize={theme.label.fontSize}
                fontFamily={theme.label.fontFamily}
            />
            <Labels
                className="heatmap-column-label"
                items={labels ? columnLabels : []}
                keyFor={(label) => label.value}
                x={(label) => label.center}
                y={() => plotTop - 8}
                text={(label) => label.value}
                textAnchor={() => "middle"}
                color={theme.label.color.toString()}
                fontSize={theme.label.fontSize}
                fontFamily={theme.label.fontFamily}
            />
        </React.Fragment>
    );
}

HeatmapPlot.requiresVirtualCanvas = true;
HeatmapPlot.isPlot = true;
