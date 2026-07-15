import { d3 } from "../../d3";
import type { IColor, IData, IDatum, IOnClick, IOnMouseOut, IOnMouseOver, ITheme } from "../../types";
import { logWarning } from "../../utils";

import type { IArcAngles } from "./interpolateArc";
import { interpolateArc } from "./interpolateArc";

interface IPieHierarchyDatum {
    key: string;
    value?: number;
    datum?: IDatum;
    children?: IPieHierarchyDatum[];
}

type IPieHierarchyNode = d3.HierarchyRectangularNode<IPieHierarchyDatum>;

export interface IRenderStackedDonutPlotProps {
    /**
     * The layer to render the StackedDonut to
     */
    layer: Element;
    /**
     * The dataset for the StackedDonut
     */
    data: IData;
    /**
     * The key of the field used for the inner ring category
     */
    x: string;
    /**
     * The key of the field used for the outer ring subdivision, within each `x` category
     */
    x2: string;
    /**
     * The key of the field used for the value of each slice
     */
    y: string;
    /**
     * The x-coordinate of the center of the StackedDonut
     */
    cx: number;
    /**
     * The y-coordinate of the center of the StackedDonut
     */
    cy: number;
    /**
     * The maximum radius, in pixels, available to the StackedDonut
     */
    maxRadius: number;
    /**
     * The inner radius of the StackedDonut, as a fraction (0-1) of `maxRadius`
     */
    innerRadius: number;
    /**
     * The outer radius of the StackedDonut, as a fraction (0-1) of `maxRadius`
     */
    outerRadius: number;
    /**
     * The gap, in pixels, to leave between the inner and outer ring
     */
    ringPadding: number;
    /**
     * The angular gap, in radians, to leave between each slice
     */
    padAngle: number;
    /**
     * The corner radius, in pixels, to apply to each slice
     */
    cornerRadius: number;
    /**
     * Should the slices be sorted by value (descending) rather than using the order of `data`?
     */
    sort: boolean;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     */
    interactive: boolean;
    /**
     * The colors to use for each inner ring category, matched up against the unique values of `x` in order of appearance
     */
    colors: IColor[];
    /**
     * The theme for the chart
     */
    theme: ITheme;
    /**
     * The time in milliseconds to spend animating data transitions
     */
    animationDuration: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
    /**
     * A function that will be triggered when the mouse focuses on a slice, designed to highlight it
     */
    onFocus?: ({ datum, element, event }: { datum: IDatum; element: Element; event: any }) => void;
    /**
     * A function that will be triggered when the mouse focuses on a slice, designed to trigger tooltips
     */
    onTooltip?: ({
        datum,
        event,
        name,
        value,
        color,
    }: {
        datum: IDatum;
        event: any;
        name: string;
        value: IDatum[string];
        color: IColor;
    }) => void;
}

/**
 * Ensures that every combination of the `x`/`x2` fields is unique and logs a warning if not
 * @param  data     The full dataset
 * @param  x        The name of the inner ring category field
 * @param  x2       The name of the outer ring subdivision field
 */
function ensureCombinationsAreUnique(data: IData, x: string, x2: string): void {
    const seen = new Set<string>();

    for (const row of data) {
        const key = `${row[x]}|${row[x2]}`;

        if (seen.has(key)) {
            // prettier-ignore
            logWarning("W008", `There are duplicate combinations of the ${x} and ${x2} fields. This may cause rendering artifacts with a <StackedDonut>.`);
            return;
        }

        seen.add(key);
    }
}

/**
 * Builds a 2-level hierarchy (`x` then `x2`) from a flat dataset, and lays it out radially so that
 * each `x` category occupies an angular span proportional to its total, subdivided by `x2` within it
 * @param  data     The full dataset
 * @param  x        The name of the inner ring category field
 * @param  x2       The name of the outer ring subdivision field
 * @param  y        The name of the value field
 * @param  sort     Should the slices be sorted by value (descending)?
 * @return          The root of the laid out hierarchy
 */
function buildHierarchy(data: IData, x: string, x2: string, y: string, sort: boolean) {
    const groupedByX = d3.group(data, (d) => `${d[x]}`);

    const children: IPieHierarchyDatum[] = Array.from(groupedByX, ([key, rows]) => {
        const total = d3.sum(rows, (row) => Number(row[y]) || 0);

        return {
            key,
            // The parent ring represents an aggregate across multiple rows, so its synthetic datum
            // should only expose the fields that are actually meaningful at that level
            datum: { [x]: key, [y]: total },
            children: rows.map((row) => ({
                key: `${row[x2]}`,
                value: Number(row[y]) || 0,
                datum: row,
            })),
        };
    });

    const root = d3.hierarchy<IPieHierarchyDatum>({ key: "root", children }).sum((d) => d.value ?? 0);

    if (sort) {
        root.sort((a, b) => d3.descending(a.value, b.value));
    }

    return d3.partition<IPieHierarchyDatum>().size([2 * Math.PI, 1])(root) as IPieHierarchyNode;
}

/**
 * Helper function to render a StackedDonut plot
 * @return An object with the update and exit selection { update, exit }
 */
export function stacked({
    layer,
    data,
    x,
    x2,
    y,
    cx,
    cy,
    maxRadius,
    innerRadius,
    outerRadius,
    ringPadding,
    padAngle,
    cornerRadius,
    sort,
    interactive,
    colors,
    theme,
    animationDuration,
    onMouseOver,
    onMouseOut,
    onClick,
    onFocus,
    onTooltip,
}: IRenderStackedDonutPlotProps) {
    ensureCombinationsAreUnique(data, x, x2);

    const root = buildHierarchy(data, x, x2, y, sort);
    const parentNodes = (root.children ?? []) as IPieHierarchyNode[];
    const leafNodes = parentNodes.flatMap((node) => (node.children ?? []) as IPieHierarchyNode[]);
    const allNodes = [...parentNodes, ...leafNodes];

    const innerRadiusPx = innerRadius * maxRadius;
    const outerRadiusPx = outerRadius * maxRadius;
    const ringWidth = Math.max(0, (outerRadiusPx - innerRadiusPx - ringPadding) / 2);

    const rings = {
        1: { innerRadius: innerRadiusPx, outerRadius: innerRadiusPx + ringWidth },
        2: { innerRadius: innerRadiusPx + ringWidth + ringPadding, outerRadius: outerRadiusPx },
    };

    const parentKeys = parentNodes.map((node) => node.data.key);
    // @ts-ignore: TODO: Not sure how to fix this
    const colorScale = d3.scaleOrdinal<string>().domain(parentKeys).range(colors);

    const colorFor = (node: IPieHierarchyNode): string => {
        if (node.depth === 1) {
            return colorScale(node.data.key).toString();
        }

        const siblings = (node.parent?.children ?? []) as IPieHierarchyNode[];
        const index = siblings.indexOf(node);
        const t = siblings.length <= 1 ? 0 : index / siblings.length;

        return d3.hsl(colorScale(node.parent!.data.key).toString()).brighter(t * 1.4).toString();
    };

    const arcGenerator = d3
        .arc<{ startAngle: number; endAngle: number; innerRadius: number; outerRadius: number }>()
        .padAngle(padAngle)
        .cornerRadius(cornerRadius);

    const key = (node: IPieHierarchyNode) => `${node.depth}:${node.parent?.data.key}:${node.data.key}`;

    // D3 data join
    const join = d3.select(layer).selectAll<SVGPathElement, IPieHierarchyNode>(".pie-slice").data(allNodes, key);

    // Exit slices
    const exit = join.exit().remove();

    // Enter slices
    const enter = join
        .enter()
        .append("path")
        .attr("class", "pie-slice")
        .attr("transform", `translate(${cx}, ${cy})`)
        .attr("data-cx", cx)
        .attr("data-cy", cy)
        .attr("data-pad-angle", padAngle)
        .attr("data-corner-radius", cornerRadius)
        .style("fill", colorFor);

    // Update new and existing points
    const update = enter
        .merge(join)
        .attr("transform", `translate(${cx}, ${cy})`)
        .attr("data-cx", cx)
        .attr("data-cy", cy)
        .attr("data-pad-angle", padAngle)
        .attr("data-corner-radius", cornerRadius)
        .style("opacity", theme.series.opacity)
        .style("fill", colorFor)
        .on("mouseover", function (event, node) {
            // istanbul ignore next
            if (!interactive) return;

            const datum = node.data.datum;
            const color = colorFor(node) as IColor;
            const name = node.depth === 1 ? node.data.key : `${node.parent!.data.key} / ${node.data.key}`;

            onMouseOver && onMouseOver(datum, this, event);
            onFocus && onFocus({ element: this, event, datum });
            onTooltip && onTooltip({ datum, event, name, value: datum[y], color });
        })
        .on("mouseout", function (event, node) {
            // istanbul ignore next
            if (!interactive) return;

            onMouseOut && onMouseOut(node.data.datum, this, event);
            onFocus && onFocus(null);
            onTooltip && onTooltip(null);
        })
        .on("click", function (event, node) {
            // istanbul ignore next
            if (!interactive) return;

            onClick && onClick(node.data.datum, this, event);
        })
        .transition("arc")
        .duration(animationDuration)
        .attrTween("d", function (node) {
            const { innerRadius: ringInner, outerRadius: ringOuter } = rings[node.depth as 1 | 2];
            const element = this as unknown as { _current?: IArcAngles };
            const previous = element._current || {
                startAngle: node.x0,
                endAngle: node.x0,
                innerRadius: ringInner,
                outerRadius: ringOuter,
            };
            const target = {
                startAngle: node.x0,
                endAngle: node.x1,
                innerRadius: ringInner,
                outerRadius: ringOuter,
            };
            element._current = target;

            return (t: number) => {
                const interpolated = interpolateArc(previous, target, t);
                d3.select(this)
                    .attr("data-start-angle", interpolated.startAngle)
                    .attr("data-end-angle", interpolated.endAngle)
                    .attr("data-inner-radius", interpolated.innerRadius)
                    .attr("data-outer-radius", interpolated.outerRadius);

                return arcGenerator(interpolated);
            };
        });

    return { update, exit };
}
