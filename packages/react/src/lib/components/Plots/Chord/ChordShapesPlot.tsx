import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../../hooks";

import { interpolateArc } from "../interpolateArc";
import { interpolateRibbon } from "../interpolateRibbon";
import { renderCanvas } from "../renderCanvas";

export interface IChordShapesPlotProps {
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
    cx: number;
    cy: number;
    groups: d3.ChordGroup[];
    chords: d3.Chord[];
    groupArcGenerator: d3.Arc<any, d3.ChordGroup>;
    ribbonGenerator: d3.RibbonGenerator<any, d3.Chord, d3.ChordSubgroup>;
    innerRadiusPx: number;
    outerRadiusPx: number;
    cornerRadius: number;
    colorFor: (index: number) => string;
    keyForGroup: (group: d3.ChordGroup) => string;
    keyForChord: (chord: d3.Chord) => string;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    onGroupMouseOver?: (group: d3.ChordGroup, element: Element, event: MouseEvent) => void;
    onGroupMouseOut?: (group: d3.ChordGroup, element: Element, event: MouseEvent) => void;
    onGroupClick?: (group: d3.ChordGroup, element: Element, event: MouseEvent) => void;
    onRibbonMouseOver?: (chord: d3.Chord, element: Element, event: MouseEvent) => void;
    onRibbonMouseOut?: (chord: d3.Chord, element: Element, event: MouseEvent) => void;
    onRibbonClick?: (chord: d3.Chord, element: Element, event: MouseEvent) => void;
}

/**
 * Renders a `<Chord>`'s group arcs and connecting ribbons, with Canvas support. Bespoke (rather than
 * built from the generic `<NodesPlot>`/`<LinksPlot>`) the same way `<Donut>`/`<StackedDonut>` render
 * their slices - arcs and ribbons need per-shape transition/interpolation and a `data-path-type` for
 * Canvas that the generic plots don't support. Both shapes are joined and transitioned together, the
 * same technique `<StackedDonut>` uses to combine its slices and center-hole hit-target into a single
 * Canvas render pass
 * @param  props       The set of React properties
 * @return             The ChordShapesPlot component
 */
export function ChordShapesPlot({
    layer,
    canvas,
    renderVirtualCanvas,
    cx,
    cy,
    groups,
    chords,
    groupArcGenerator,
    ribbonGenerator,
    innerRadiusPx,
    outerRadiusPx,
    cornerRadius,
    colorFor,
    keyForGroup,
    keyForChord,
    interactive = true,
    onGroupMouseOver,
    onGroupMouseOut,
    onGroupClick,
    onRibbonMouseOver,
    onRibbonMouseOut,
    onRibbonClick,
}: IChordShapesPlotProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        // D3 data join - group arcs
        const groupJoin = d3
            .select(layer.current)
            .selectAll<SVGPathElement, d3.ChordGroup>(".chord-group")
            .data(groups, (group) => keyForGroup(group));

        groupJoin.exit().remove();

        const groupEnter = groupJoin
            .enter()
            .append("path")
            .attr("class", "chord-group")
            .attr("data-path-type", "arc")
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("data-cx", cx)
            .attr("data-cy", cy)
            .attr("data-inner-radius", innerRadiusPx)
            .attr("data-outer-radius", outerRadiusPx)
            .attr("data-corner-radius", cornerRadius)
            .style("fill", (group) => colorFor(group.index));

        const groupUpdate = groupEnter
            .merge(groupJoin as any)
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("data-cx", cx)
            .attr("data-cy", cy)
            .attr("data-inner-radius", innerRadiusPx)
            .attr("data-outer-radius", outerRadiusPx)
            .attr("data-corner-radius", cornerRadius)
            .style("opacity", theme.series.opacity)
            .style("fill", (group) => colorFor(group.index))
            .style("cursor", interactive ? "pointer" : "default")
            .on("mouseover", function (event, group) {
                // istanbul ignore next
                if (!interactive) return;
                onGroupMouseOver && onGroupMouseOver(group, this, event);
            })
            .on("mouseout", function (event, group) {
                // istanbul ignore next
                if (!interactive) return;
                onGroupMouseOut && onGroupMouseOut(group, this, event);
            })
            .on("click", function (event, group) {
                // istanbul ignore next
                if (!interactive) return;
                onGroupClick && onGroupClick(group, this, event);
            });

        // D3 data join - ribbons
        const ribbonJoin = d3
            .select(layer.current)
            .selectAll<SVGPathElement, d3.Chord>(".chord-ribbon")
            .data(chords, (chord) => keyForChord(chord));

        ribbonJoin.exit().remove();

        const ribbonEnter = ribbonJoin
            .enter()
            .append("path")
            .attr("class", "chord-ribbon")
            .attr("data-path-type", "ribbon")
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("data-cx", cx)
            .attr("data-cy", cy)
            .attr("data-radius", innerRadiusPx)
            .style("fill", (chord) => colorFor(chord.source.index));

        const ribbonUpdate = ribbonEnter
            .merge(ribbonJoin as any)
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("data-cx", cx)
            .attr("data-cy", cy)
            .attr("data-radius", innerRadiusPx)
            .style("opacity", theme.series.opacity)
            .style("fill", (chord) => colorFor(chord.source.index))
            .style("cursor", interactive ? "pointer" : "default")
            .on("mouseover", function (event, chord) {
                // istanbul ignore next
                if (!interactive) return;
                onRibbonMouseOver && onRibbonMouseOver(chord, this, event);
            })
            .on("mouseout", function (event, chord) {
                // istanbul ignore next
                if (!interactive) return;
                onRibbonMouseOut && onRibbonMouseOut(chord, this, event);
            })
            .on("click", function (event, chord) {
                // istanbul ignore next
                if (!interactive) return;
                onRibbonClick && onRibbonClick(chord, this, event);
            });

        // d3's selection.merge() only fills (null) gaps between an enter/update pair from the *same*
        // join - it doesn't concatenate two unrelated selections/joins like these. Concatenating their
        // nodes directly and re-wrapping them is what actually combines them into one selection, so a
        // single Canvas render pass (and virtual-canvas registration) covers both shapes
        const combined = d3.selectAll<Element, unknown>([...groupUpdate.nodes(), ...ribbonUpdate.nodes()]);

        const update = combined.transition("chord-shape").duration(animationDuration).attrTween("d", function (datum) {
            const element = this as unknown as { _current?: unknown };
            const isGroup = d3.select(this).classed("chord-group");

            if (isGroup) {
                const group = datum as d3.ChordGroup;
                const previous = (element._current as { startAngle: number; endAngle: number }) ?? {
                    startAngle: group.startAngle,
                    endAngle: group.startAngle,
                };
                const target = { startAngle: group.startAngle, endAngle: group.endAngle };
                element._current = target;

                return (t: number) => {
                    // innerRadius/outerRadius are fixed for every group, so interpolating them alongside
                    // startAngle/endAngle (rather than writing a dedicated group-arc lerp) is a no-op
                    const interpolated = interpolateArc(
                        { ...previous, innerRadius: innerRadiusPx, outerRadius: outerRadiusPx },
                        { ...target, innerRadius: innerRadiusPx, outerRadius: outerRadiusPx },
                        t,
                    );
                    d3.select(this)
                        .attr("data-start-angle", interpolated.startAngle)
                        .attr("data-end-angle", interpolated.endAngle);

                    // @ts-ignore: TODO: Not sure how to fix this
                    return groupArcGenerator(interpolated);
                };
            }

            const chord = datum as d3.Chord;
            const previous = (element._current as {
                sourceStartAngle: number;
                sourceEndAngle: number;
                targetStartAngle: number;
                targetEndAngle: number;
            }) ?? {
                sourceStartAngle: chord.source.startAngle,
                sourceEndAngle: chord.source.startAngle,
                targetStartAngle: chord.target.startAngle,
                targetEndAngle: chord.target.startAngle,
            };
            const target = {
                sourceStartAngle: chord.source.startAngle,
                sourceEndAngle: chord.source.endAngle,
                targetStartAngle: chord.target.startAngle,
                targetEndAngle: chord.target.endAngle,
            };
            element._current = target;

            return (t: number) => {
                const interpolated = interpolateRibbon(previous, target, t);
                d3.select(this)
                    .attr("data-source-start-angle", interpolated.sourceStartAngle)
                    .attr("data-source-end-angle", interpolated.sourceEndAngle)
                    .attr("data-target-start-angle", interpolated.targetStartAngle)
                    .attr("data-target-end-angle", interpolated.targetEndAngle);

                // @ts-ignore: TODO: Not sure how to fix this
                return ribbonGenerator({
                    source: { startAngle: interpolated.sourceStartAngle, endAngle: interpolated.sourceEndAngle },
                    target: { startAngle: interpolated.targetStartAngle, endAngle: interpolated.targetEndAngle },
                } as d3.Chord) as string;
            };
        });

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        groups,
        chords,
        groupArcGenerator,
        ribbonGenerator,
        innerRadiusPx,
        outerRadiusPx,
        cornerRadius,
        cx,
        cy,
        colorFor,
        keyForGroup,
        keyForChord,
        interactive,
        canvas,
        renderVirtualCanvas,
        layer,
        theme,
        animationDuration,
        onGroupMouseOver,
        onGroupMouseOut,
        onGroupClick,
        onRibbonMouseOver,
        onRibbonMouseOut,
        onRibbonClick,
    ]);

    return null;
}
