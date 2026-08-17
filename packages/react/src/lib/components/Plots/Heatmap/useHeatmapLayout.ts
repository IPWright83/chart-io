import { chartSelectors, d3, ensureCombinationsAreUnique, IState } from "@chart-io/core";
import type { IColor, IData } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

export interface IHeatmapCell {
    row: string;
    column: string;
    value: number;
    datum: IData[number];
}

export interface IHeatmapAxisLabel {
    /**
     * The row/column category value this label represents
     */
    value: string;
    /**
     * The label's center position along the axis, in plot-relative pixels
     */
    center: number;
    /**
     * The group this row/column belongs to (from `rowGroupBy`/`columnGroupBy`), if any
     */
    group?: string;
}

interface IBand {
    start: number;
    bandwidth: number;
}

export interface IUseHeatmapLayoutProps {
    rows: string;
    columns: string;
    value: string;
    colors?: IColor[];
    padding: number;
    rowGroupBy?: string;
    columnGroupBy?: string;
    groupGap: number;
    rowsGrouped: boolean;
    columnsGrouped: boolean;
}

/**
 * Returns, for each value of `field`, the first value of `groupByField` seen alongside it - i.e. the
 * group that row/column belongs to. Undefined if no `groupByField` is given
 * @param  data             The full dataset
 * @param  field            The row/column field to group
 * @param  groupByField     The field giving each row/column's group
 * @return                  A map of row/column value to its group, or undefined if ungrouped
 */
function buildGroupMap(data: IData, field: string, groupByField: string | undefined): Map<string, string> | undefined {
    if (!groupByField) return undefined;

    const groupOf = new Map<string, string>();
    for (const datum of data) {
        const key = `${datum[field]}`;
        if (!groupOf.has(key)) {
            groupOf.set(key, `${datum[groupByField]}`);
        }
    }

    return groupOf;
}

/**
 * The unique values of `field`, in the order they first appear in `data`
 * @param  data      The full dataset
 * @param  field     The row/column field
 * @return           The unique row/column values, in first-appearance order
 */
function uniqueValuesInOrder(data: IData, field: string): string[] {
    const seen = new Set<string>();
    const order: string[] = [];

    for (const datum of data) {
        const key = `${datum[field]}`;
        if (!seen.has(key)) {
            seen.add(key);
            order.push(key);
        }
    }

    return order;
}

/**
 * Reorders `values` so that values sharing a group (per `groupOf`) become adjacent, groups ordered by
 * where they first appear in `values`. Values within a group keep their original relative order -
 * `Array.prototype.sort` is stable (guaranteed since ES2019), so a plain sort by group index is enough
 * @param  values       The row/column values to reorder, in their natural order
 * @param  groupOf      A map of row/column value to its group
 * @return              `values`, reordered so values sharing a group are adjacent
 */
function groupedOrder(values: string[], groupOf: Map<string, string>): string[] {
    const groupOrder: string[] = [];
    const seenGroups = new Set<string>();

    for (const value of values) {
        const group = groupOf.get(value);
        if (!seenGroups.has(group)) {
            seenGroups.add(group);
            groupOrder.push(group);
        }
    }

    const groupIndex = new Map(groupOrder.map((group, index) => [group, index]));

    return [...values].sort((a, b) => groupIndex.get(groupOf.get(a)) - groupIndex.get(groupOf.get(b)));
}

/**
 * Lays `values` out end-to-end within `size`, every band the same width, separated by `padding` -
 * except at a boundary between two different groups (per `groupOf`), which gets `groupGap` instead, so
 * grouped clusters read as visually distinct
 * @param  values       The row/column values to lay out, in the order they should appear
 * @param  size         The pixel size (plot width/height) available to lay the bands out within
 * @param  padding      The gap, in pixels, between two adjacent bands in the same group
 * @param  groupGap     The gap, in pixels, between two adjacent bands in different groups
 * @param  groupOf      A map of row/column value to its group, or undefined to ignore grouping
 * @return              A map of row/column value to its band's start position and width
 */
function computeBands(
    values: string[],
    size: number,
    padding: number,
    groupGap: number,
    groupOf: Map<string, string> | undefined,
): Map<string, IBand> {
    const bands = new Map<string, IBand>();
    if (values.length === 0) return bands;

    const gaps = values.slice(1).map((value, index) => (groupOf && groupOf.get(value) !== groupOf.get(values[index]) ? groupGap : padding));
    const totalGap = gaps.reduce((sum, gap) => sum + gap, 0);
    const bandwidth = Math.max(0, (size - totalGap) / values.length);

    let cursor = 0;
    values.forEach((value, index) => {
        if (index > 0) cursor += gaps[index - 1];
        bands.set(value, { start: cursor, bandwidth });
        cursor += bandwidth;
    });

    return bands;
}

/**
 * Blends between a list of colors at `t` (0-1), treating them as equally spaced stops along a
 * sequential scale
 * @param  colors    The color stops to interpolate between, lowest value first
 * @param  t         The position (0-1) along the scale to sample a color at
 * @return           The CSS color string at that position
 */
function interpolateColors(colors: IColor[], t: number): string {
    if (colors.length === 1) return `${colors[0]}`;

    const clamped = Math.min(Math.max(t, 0), 1);
    const scaled = clamped * (colors.length - 1);
    const index = Math.min(Math.floor(scaled), colors.length - 2);
    const localT = scaled - index;

    const from = d3.rgb(colors[index] as string);
    const to = d3.rgb(colors[index + 1] as string);

    return d3
        .rgb(
            Math.round(from.r + (to.r - from.r) * localT),
            Math.round(from.g + (to.g - from.g) * localT),
            Math.round(from.b + (to.b - from.b) * localT),
        )
        .toString();
}

/**
 * Computes the layout shared by a Heatmap's cells, row labels and column labels - the row/column
 * ordering (optionally grouped), band positions and value/color scale - so it only runs once per
 * render rather than being repeated by each of the three, which instead just render from the values
 * this returns. Grouping a row or column reorders its band (and, in turn, transitions every cell that
 * shares it to its new position) without changing the underlying data
 * @param  props       The set of properties needed to build the layout
 * @return             The computed layout
 */
export function useHeatmapLayout({
    rows,
    columns,
    value,
    colors,
    padding,
    rowGroupBy,
    columnGroupBy,
    groupGap,
    rowsGrouped,
    columnsGrouped,
}: IUseHeatmapLayoutProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    return useMemo(() => {
        ensureCombinationsAreUnique(data, [rows, columns], "Heatmap");

        const rowGroupOf = buildGroupMap(data, rows, rowGroupBy);
        const columnGroupOf = buildGroupMap(data, columns, columnGroupBy);

        const naturalRowOrder = uniqueValuesInOrder(data, rows);
        const naturalColumnOrder = uniqueValuesInOrder(data, columns);

        const rowOrder = rowsGrouped && rowGroupOf ? groupedOrder(naturalRowOrder, rowGroupOf) : naturalRowOrder;
        const columnOrder = columnsGrouped && columnGroupOf ? groupedOrder(naturalColumnOrder, columnGroupOf) : naturalColumnOrder;

        const rowBands = computeBands(rowOrder, plotHeight, padding, groupGap, rowsGrouped ? rowGroupOf : undefined);
        const columnBands = computeBands(columnOrder, plotWidth, padding, groupGap, columnsGrouped ? columnGroupOf : undefined);

        const values = data.map((datum) => +datum[value]).filter((v) => !Number.isNaN(v));
        const [minValue, maxValue] = d3.extent(values);
        const palette = colors ?? [theme.background, theme.series.colors[0]];

        const colorFor = (cellValue: number) => {
            if (minValue === undefined) return `${palette[0]}`;
            const t = maxValue === minValue ? 1 : (cellValue - minValue) / (maxValue - minValue);
            return interpolateColors(palette, t);
        };

        const cells: IHeatmapCell[] = data
            .filter((datum) => datum[rows] !== null && datum[rows] !== undefined && datum[columns] !== null && datum[columns] !== undefined)
            .map((datum) => ({
                row: `${datum[rows]}`,
                column: `${datum[columns]}`,
                value: +datum[value],
                datum,
            }));

        const keyFor = (cell: IHeatmapCell) => `${cell.row}::${cell.column}`;
        const xFor = (cell: IHeatmapCell) => plotLeft + (columnBands.get(cell.column)?.start ?? 0);
        const yFor = (cell: IHeatmapCell) => plotTop + (rowBands.get(cell.row)?.start ?? 0);
        const widthFor = (cell: IHeatmapCell) => columnBands.get(cell.column)?.bandwidth ?? 0;
        const heightFor = (cell: IHeatmapCell) => rowBands.get(cell.row)?.bandwidth ?? 0;
        const cellColorFor = (cell: IHeatmapCell) => colorFor(cell.value);

        const rowLabels: IHeatmapAxisLabel[] = rowOrder.map((rowValue) => {
            const band = rowBands.get(rowValue);
            return { value: rowValue, center: plotTop + band.start + band.bandwidth / 2, group: rowGroupOf?.get(rowValue) };
        });

        const columnLabels: IHeatmapAxisLabel[] = columnOrder.map((columnValue) => {
            const band = columnBands.get(columnValue);
            return { value: columnValue, center: plotLeft + band.start + band.bandwidth / 2, group: columnGroupOf?.get(columnValue) };
        });

        return {
            cells,
            keyFor,
            xFor,
            yFor,
            widthFor,
            heightFor,
            colorFor: cellColorFor,
            rowLabels,
            columnLabels,
            minValue,
            maxValue,
            plotLeft,
            plotTop,
        };
    }, [
        data,
        rows,
        columns,
        value,
        colors,
        padding,
        rowGroupBy,
        columnGroupBy,
        groupGap,
        rowsGrouped,
        columnsGrouped,
        plotLeft,
        plotTop,
        plotWidth,
        plotHeight,
        theme,
    ]);
}
