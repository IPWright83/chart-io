import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IDatum, IScale, IValue } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { calculateScale } from "../../Scale/calculateScale";
import { IBandwidthScale } from "../IBandwidthScale";

// The vertical space, in pixels, reserved above the tick range for each axis' dimension label, so
// label text doesn't collide with the topmost tick - the same purpose as `useChordLayout`'s LABEL_MARGIN
const AXIS_LABEL_MARGIN = 24;

export interface IUseParallelCoordinatesLayoutProps {
    /**
     * The ordered list of fields to plot, one vertical axis per field
     */
    dimensions: string[];
    /**
     * The key of the field used to label each row/line. Falls back to the row's index when omitted
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
    colors?: IColor[];
}

export interface IParallelCoordinatesRow {
    /**
     * A stable key identifying this row - the `name` field's value, or the row's index
     */
    key: string;
    /**
     * The underlying row of data this line represents
     */
    datum: IDatum;
    /**
     * One point per dimension, in the same order as `dimensions`, already resolved to chart-relative
     * pixel coordinates
     */
    points: { x: number; y: number }[];
    /**
     * The row's pixel y-coordinate on each dimension's axis, keyed by dimension - used to test a row
     * against a brush's pixel extent without needing to invert any scale
     */
    valueAt: Record<string, number>;
    /**
     * This row's resolved color
     */
    color: string;
}

/**
 * Computes the layout shared by a `<ParallelCoordinates>`'s lines and axes - one independently scaled
 * vertical axis per dimension (evenly spaced across the plot width, the same way each spoke of a
 * `<Radar>` is independently scaled), plus a polyline per row connecting its value on every dimension.
 * Rows with a missing value on any dimension are left out entirely, since a line can't meaningfully
 * pass through a gap
 * @param  props       The set of properties needed to build the layout
 * @return             The computed layout, plus legend data
 */
export function useParallelCoordinatesLayout({ dimensions, name, color, colors }: IUseParallelCoordinatesLayoutProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const right = useSelector((s: IState) => chartSelectors.dimensions.plot.right(s));
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const bottom = useSelector((s: IState) => chartSelectors.dimensions.plot.bottom(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const palette = colors ?? theme.series.colors;
    const axisTop = top + AXIS_LABEL_MARGIN;
    const axisBottom = bottom;

    // One shared horizontal position per dimension, evenly spaced across the plot
    const xScale = useMemo(
        () => d3.scalePoint<string>().domain(dimensions).range([left, right]),
        [dimensions, left, right],
    );

    // Each dimension gets its own independently computed domain/scale type (linear, time or band),
    // the same way a <Radar>'s spokes are scaled - see useChordLayout/RadiusScale for the equivalent
    const scaleFor = useMemo(() => {
        const scales = new Map<string, IScale>();
        dimensions.forEach((dimension) => {
            scales.set(dimension, calculateScale(data, [dimension], [axisBottom, axisTop], undefined, false));
        });
        return scales;
    }, [data, dimensions, axisTop, axisBottom]);

    const categories = useMemo(
        () => (color ? Array.from(new Set(data.map((row) => `${row[color]}`))) : []),
        [data, color],
    );
    // @ts-ignore: TODO: Not sure how to fix this
    const colorScale = useMemo(() => d3.scaleOrdinal<string>().domain(categories).range(palette), [categories, palette]);

    const rows = useMemo(() => {
        const toPixelY = (dimension: string, value: IValue | null | undefined): number | null => {
            const scale = scaleFor.get(dimension);
            if (!scale || value === null || value === undefined) return null;

            const bandwidth = (scale as IBandwidthScale).bandwidth ? (scale as IBandwidthScale).bandwidth() / 2 : 0;
            // The intersected call signature on IScale doesn't resolve cleanly against a plain IValue argument
            return (scale as unknown as (value: IValue) => number)(value) + bandwidth;
        };

        return data
            .map((datum, index) => {
                const valueAt: Record<string, number> = {};

                const complete = dimensions.every((dimension) => {
                    const y = toPixelY(dimension, datum[dimension]);
                    if (y === null) return false;

                    valueAt[dimension] = y;
                    return true;
                });

                if (!complete) return null;

                const points = dimensions.map((dimension) => ({ x: xScale(dimension), y: valueAt[dimension] }));
                const key = name ? `${datum[name]}` : `${index}`;
                const rowColor = color ? colorScale(`${datum[color]}`) : `${palette[0]}`;

                const row: IParallelCoordinatesRow = { key, datum, points, valueAt, color: rowColor };
                return row;
            })
            .filter((row): row is IParallelCoordinatesRow => row !== null);
    }, [data, dimensions, xScale, scaleFor, name, color, colorScale, palette]);

    return {
        rows,
        dimensions,
        xScale,
        scaleFor,
        axisTop,
        axisBottom,
        legendKeys: categories,
        legendColors: categories.map((_, i) => palette[i % palette.length]),
    };
}
