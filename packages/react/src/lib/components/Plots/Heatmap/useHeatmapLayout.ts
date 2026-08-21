import { chartSelectors, d3, ensureCombinationsAreUnique, IScaleType, IState } from "@chart-io/core";
import type { IBandwidthScale, IColor, IData, IDatum, IScale } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { usePivot } from "../usePivot";

export interface IHeatmapCell {
    row: string;
    column: string;
    value: number;
    datum: IDatum;
}

interface ICumulative {
    previous: number;
    current: number;
}

export interface IUseHeatmapDomainsProps {
    rows: string;
    columns: string;
    value: string;
}

export interface IUseHeatmapLayoutProps extends IUseHeatmapDomainsProps {
    colors?: IColor[];
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
 * For every row/column combination (a dense cross-product of `rowValues` x `columnValues`, missing
 * combinations defaulting to 0), builds a running cumulative sum along `groupBy` - "rows" sums each
 * row's values across its columns, "columns" sums each column's values down its rows. This is what
 * lets a row/column collapse into a single stacked bar: a cell's `previous`/`current` become its
 * segment's start/end position along the collapsed axis
 * @param  rowValues       Every row value, in band order
 * @param  columnValues    Every column value, in band order
 * @param  valueAt         A row/column pair (joined by "::") to its value
 * @param  groupBy         Which axis to stack along - "rows" stacks each row's columns, "columns"
 *                         stacks each column's rows
 * @return                 A row/column pair (joined by "::") to its cumulative previous/current, plus
 *                         the max total reached by any single row/column
 */
function cumulativeBy(
    rowValues: string[],
    columnValues: string[],
    valueAt: Map<string, number>,
    groupBy: "rows" | "columns",
): { cumulative: Map<string, ICumulative>; maxTotal: number } {
    const cumulative = new Map<string, ICumulative>();
    let maxTotal = 0;

    const outer = groupBy === "rows" ? rowValues : columnValues;
    const inner = groupBy === "rows" ? columnValues : rowValues;

    for (const outerValue of outer) {
        let running = 0;

        for (const innerValue of inner) {
            const row = groupBy === "rows" ? outerValue : innerValue;
            const column = groupBy === "rows" ? innerValue : outerValue;
            const v = valueAt.get(`${row}::${column}`) ?? 0;

            const previous = running;
            running += v;
            cumulative.set(`${row}::${column}`, { previous, current: running });
        }

        maxTotal = Math.max(maxTotal, running);
    }

    return { cumulative, maxTotal };
}

/**
 * Computes the row/column domains shared by a Heatmap's axes and its cells - every row/column value
 * (in band order), each cell's value, and the running cumulative sums (and their maxima) used to lay a
 * pivoted axis's cells out as a stacked bar. Deliberately reads only `data`/`rows`/`columns`/`value` -
 * not the scales those domains end up feeding - so components composing this (`<HeatmapAxes>`,
 * `useHeatmapLayout`) don't re-render each other into a loop over a scale they themselves produce
 * @param  props       The row/column/value fields to compute domains for
 * @return             The computed row/column domains
 */
export function useHeatmapDomains({ rows, columns, value }: IUseHeatmapDomainsProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));

    return useMemo(() => {
        ensureCombinationsAreUnique(data, [rows, columns], "Heatmap");

        const rowValues = uniqueValuesInOrder(data, rows);
        const columnValues = uniqueValuesInOrder(data, columns);

        const valueAt = new Map<string, number>();
        const datumAt = new Map<string, IDatum>();
        for (const datum of data) {
            const key = `${datum[rows]}::${datum[columns]}`;
            valueAt.set(key, +datum[value]);
            datumAt.set(key, datum);
        }

        const values = Array.from(valueAt.values()).filter((v) => !Number.isNaN(v));
        const [minValue, maxValue] = d3.extent(values);

        const { cumulative: rowCumulative, maxTotal: maxRowTotal } = cumulativeBy(rowValues, columnValues, valueAt, "rows");
        const { cumulative: columnCumulative, maxTotal: maxColumnTotal } = cumulativeBy(rowValues, columnValues, valueAt, "columns");

        return { rowValues, columnValues, valueAt, datumAt, minValue, maxValue, rowCumulative, columnCumulative, maxRowTotal, maxColumnTotal };
    }, [data, rows, columns, value]);
}

/**
 * Computes the field/scale-type/domain the x/y axis should use for the current pivot - a pivoted axis
 * collapses onto a linear scale over `value` (bounded by the largest row/column total), the other
 * stays a band scale over its own row/column values, in a fixed order regardless of pivot. Shared by
 * `<HeatmapAxes>` (which renders the actual `<XAxis>`/`<YAxis>`) and `useHeatmapLayout` (which needs
 * the same field names to read the resulting scales back out of the store)
 * @param  pivot            The current pivot
 * @param  rows             The field used for each cell's row
 * @param  columns          The field used for each cell's column
 * @param  value            The field used for each cell's value
 * @param  maxRowTotal      The largest total reached by any single row
 * @param  maxColumnTotal   The largest total reached by any single column
 * @param  rowValues        Every row value, in band order
 * @param  columnValues     Every column value, in band order
 * @return                  The x/y axis field/scale-type/domain for the current pivot
 */
export function heatmapAxisFor(
    pivot: string,
    rows: string,
    columns: string,
    value: string,
    maxRowTotal: number,
    maxColumnTotal: number,
    rowValues: string[],
    columnValues: string[],
) {
    const xField = pivot === "rows" ? value : columns;
    const yField = pivot === "columns" ? value : rows;
    const xScaleType: IScaleType = pivot === "rows" ? "linear" : "band";
    const yScaleType: IScaleType = pivot === "columns" ? "linear" : "band";
    const xDomain = pivot === "rows" ? [0, maxRowTotal] : columnValues;
    const yDomain = pivot === "columns" ? [0, maxColumnTotal] : rowValues;

    return { xField, yField, xScaleType, yScaleType, xDomain, yDomain };
}

/**
 * Computes the layout for a Heatmap's cells and legend - per-cell position/color accessors (reading
 * the x/y scales `<HeatmapAxes>` registers) and the color legend's stops - so `<HeatmapPlot>` only
 * needs to render from the values this returns. Switching `pivot` doesn't change the set of cells -
 * every row/column combination is always rendered, missing ones defaulting to 0 - it only changes how
 * each cell's position is computed, so existing cells transition to their new position/size rather
 * than being re-created
 * @param  props       The set of properties needed to build the layout
 * @return             The computed layout, plus the current pivot
 */
export function useHeatmapLayout({ rows, columns, value, colors }: IUseHeatmapLayoutProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const { pivot } = usePivot();

    const { rowValues, columnValues, valueAt, datumAt, minValue, maxValue, rowCumulative, columnCumulative, maxRowTotal, maxColumnTotal } =
        useHeatmapDomains({ rows, columns, value });

    const { xField, yField } = heatmapAxisFor(pivot, rows, columns, value, maxRowTotal, maxColumnTotal, rowValues, columnValues);

    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, xField, "plot"));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, yField, "plot"));

    return useMemo(() => {
        const palette = colors ?? [theme.background, theme.series.colors[0]];

        // An odd-length palette (3, 5, ...) has a designated middle stop - the diverging convention
        // for e.g. a correlation matrix, where that stop should land on 0 rather than the data's
        // midpoint. Centering the domain on 0 (using the larger of |min|/|max| as its extent) only
        // when the data actually straddles 0 keeps a plain sequential (2-color) heatmap unaffected
        const isDiverging = palette.length % 2 === 1 && palette.length > 1 && minValue !== undefined && minValue < 0 && maxValue > 0;
        const maxAbs = isDiverging ? Math.max(Math.abs(minValue), Math.abs(maxValue)) : undefined;
        const colorMin = isDiverging ? -maxAbs : minValue;
        const colorMax = isDiverging ? maxAbs : maxValue;

        const colorFor = (cellValue: number) => {
            if (colorMin === undefined) return `${palette[0]}`;
            const t = colorMax === colorMin ? 1 : (cellValue - colorMin) / (colorMax - colorMin);
            return interpolateColors(palette, t);
        };

        // Every row/column combination is always rendered - missing ones default to a 0 value, dense
        // enough for the stacked previous/current positions below to always be well-defined
        const cells: IHeatmapCell[] = rowValues.flatMap((row) =>
            columnValues.map((column) => {
                const key = `${row}::${column}`;
                return {
                    row,
                    column,
                    value: valueAt.get(key) ?? 0,
                    datum: datumAt.get(key) ?? ({ [rows]: row, [columns]: column, [value]: 0 } as IDatum),
                };
            }),
        );

        const keyFor = (cell: IHeatmapCell) => `${cell.row}::${cell.column}`;

        const xFor = (cell: IHeatmapCell) => {
            if (!xScale) return 0;
            if (pivot === "rows") {
                const { previous } = rowCumulative.get(keyFor(cell));
                return (xScale as IScale)(previous) as number;
            }
            // @ts-ignore: TODO: Need to work out casting
            return (xScale as IScale)(cell.column) as number;
        };

        const widthFor = (cell: IHeatmapCell) => {
            if (!xScale) return 0;
            if (pivot === "rows") {
                const { previous, current } = rowCumulative.get(keyFor(cell));
                return ((xScale as IScale)(current) as number) - ((xScale as IScale)(previous) as number);
            }
            return (xScale as IBandwidthScale).bandwidth();
        };

        const yFor = (cell: IHeatmapCell) => {
            if (!yScale) return 0;
            if (pivot === "columns") {
                const { current } = columnCumulative.get(keyFor(cell));
                return (yScale as IScale)(current) as number;
            }
            // @ts-ignore: TODO: Need to work out casting
            return (yScale as IScale)(cell.row) as number;
        };

        const heightFor = (cell: IHeatmapCell) => {
            if (!yScale) return 0;
            if (pivot === "columns") {
                const { previous, current } = columnCumulative.get(keyFor(cell));
                return ((yScale as IScale)(previous) as number) - ((yScale as IScale)(current) as number);
            }
            return (yScale as IBandwidthScale).bandwidth();
        };

        const cellColorFor = (cell: IHeatmapCell) => colorFor(cell.value);

        // 6 evenly spaced stops across the color domain, for the color legend
        const legendStops =
            colorMin === undefined
                ? []
                : d3.range(6).map((i) => {
                      const stopValue = colorMin + (i / 5) * (colorMax - colorMin);
                      return { value: stopValue, color: colorFor(stopValue) };
                  });

        return {
            pivot,
            cells,
            keyFor,
            xFor,
            yFor,
            widthFor,
            heightFor,
            colorFor: cellColorFor,
            legendStops,
            minValue,
            maxValue,
        };
    }, [
        pivot,
        xScale,
        yScale,
        rowValues,
        columnValues,
        valueAt,
        datumAt,
        rowCumulative,
        columnCumulative,
        rows,
        columns,
        value,
        colors,
        theme,
        minValue,
        maxValue,
    ]);
}
