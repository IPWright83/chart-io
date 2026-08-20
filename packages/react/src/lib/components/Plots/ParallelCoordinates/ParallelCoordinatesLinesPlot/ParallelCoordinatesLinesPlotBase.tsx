import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../../../hooks";

import { interpolatePoints } from "../../interpolatePoints";
import { renderCanvas } from "../../renderCanvas";

import type { IParallelCoordinatesRow } from "../useParallelCoordinatesLayout";

// How much a row's line is faded when at least one axis is brushed and this row falls outside it -
// low enough that unselected rows read as background context rather than competing with the selection
const BRUSHED_OUT_OPACITY = 0.05;

export interface IParallelCoordinatesLinesPlotBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    rows: IParallelCoordinatesRow[];
    /**
     * The width, in pixels, of each row's line
     */
    lineWidth: number;
    /**
     * Is this row currently within every brushed axis' extent? Ignored (every row treated as selected)
     * while no axis is brushed
     */
    isSelected: (row: IParallelCoordinatesRow) => boolean;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     */
    interactive?: boolean;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Renders a `<ParallelCoordinates>`'s rows as polylines, one per row, with Canvas support. A plain
 * `<polyline>` (rather than an SVG `<path>`) is used for each row, since it's a straight-segment line
 * through a handful of known points, keeping the Canvas side a simple point list to walk (see
 * `renderPolyline`) rather than needing to parse/replay path commands
 * @param  props       The set of React properties
 * @return             The ParallelCoordinatesLinesPlotBase component
 */
export function ParallelCoordinatesLinesPlotBase({
    layer,
    canvas,
    renderVirtualCanvas,
    rows,
    lineWidth,
    isSelected,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IParallelCoordinatesLinesPlotBaseProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

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
                onMouseOver && onMouseOver(row.datum, this, event);
            })
            .on("mouseout", function (event, row) {
                // istanbul ignore next
                if (!interactive) return;
                onMouseOut && onMouseOut(row.datum, this, event);
            })
            .on("click", function (event, row) {
                // istanbul ignore next
                if (!interactive) return;
                onClick && onClick(row.datum, this, event);
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
    }, [rows, lineWidth, isSelected, interactive, canvas, renderVirtualCanvas, layer, width, height, animationDuration, theme, onMouseOver, onMouseOut, onClick]);

    return null;
}
