import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useLegendItems } from "../../../hooks";
import { withCanvas, withSVG } from "../../../hoc";

import { ILabelsPlotProps, LabelsPlot } from "../LabelsPlot";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { ChordShapesPlot, IChordShapesPlotProps } from "./ChordShapesPlot";
import { useChordLayout } from "./useChordLayout";

const CanvasChordShapesPlot = withCanvas<IChordShapesPlotProps>(ChordShapesPlot, "plot chord-shapes");
const SVGChordShapesPlot = withSVG<IChordShapesPlotProps>(ChordShapesPlot, "plot chord-shapes");
const CanvasLabelsPlot = withCanvas<ILabelsPlotProps<d3.ChordGroup>>(LabelsPlot, "plot chord-labels");
const SVGLabelsPlot = withSVG<ILabelsPlotProps<d3.ChordGroup>>(LabelsPlot, "plot chord-labels");

export interface IChordPlotProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
    /**
     * The key of the field used for the "from" node of each flow
     */
    source: string;
    /**
     * The key of the field used for the "to" node of each flow
     */
    target: string;
    /**
     * The key of the field used for the size of each flow between `source` and `target`
     */
    value: string;
    /**
     * The thickness, in pixels, of the group arc ring. The outer radius is derived from the available
     * plot radius (shrunk to leave room for labels when `labels` is set), and the inner radius - where
     * the ribbons attach - is `thickness` inside that, so there's no need to reason about two separate
     * radii yourself
     * @default 20
     */
    thickness?: number;
    /**
     * The angular gap, in radians, to leave between each group
     * @default 0.03
     */
    padAngle?: number;
    /**
     * The corner radius, in pixels, to apply to each group arc
     * @default 0
     */
    cornerRadius?: number;
    /**
     * Should the groups be sorted by their total flow (descending) rather than using the order the
     * nodes first appear in the data?
     * @default false
     */
    sort?: boolean;
    /**
     * The set of colors to use for each node. Defaults to the theme's series colors. Each ribbon takes
     * the color of its source node
     */
    colors?: Array<IColor>;
    /**
     * Should node labels be shown around the outside of the diagram?
     * @default true
     */
    labels?: boolean;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    /**
     * Should this series feature in the Legend? Off by default - with every node's arc drawn and
     * labelled (unlike `<CirclePacking>`, where only qualifying leaves are labelled), the legend is
     * often redundant
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
 * Represents a Chord plot, showing the flow between nodes (built from `source`/`target`) as ribbons
 * connecting arcs arranged around a circle, each arc sized proportionally to its node's total flow.
 * Used internally by `<Chord>` - use that unless you need to compose the plot into a chart of your own
 *
 * Computes the chord layout once (see `useChordLayout`) and renders the group arcs/ribbons and labels
 * via `<ChordShapesPlot>`/`<LabelsPlot>`, each with its own Canvas/SVG layer - the same way
 * `<DendrogramPlot>` renders its links/nodes/labels
 * @param  props       The set of React properties
 * @return             The ChordPlot component
 */
export function ChordPlot({
    useCanvas = false,
    source,
    target,
    value,
    renderVirtualCanvas,
    thickness = 20,
    padAngle = 0.03,
    cornerRadius = 0,
    sort = false,
    colors,
    labels = true,
    showInLegend = false,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IChordPlotProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const {
        names,
        cx,
        cy,
        groups,
        chords,
        groupArcGenerator,
        ribbonGenerator,
        innerRadiusPx,
        outerRadiusPx,
        colorFor,
        keyForGroup,
        keyForChord,
        datumForGroup,
        datumForChord,
        labelX,
        labelY,
        labelAnchor,
        legendKeys,
        legendColors,
    } = useChordLayout({ source, target, value, thickness, labels, padAngle, cornerRadius, sort, colors });

    useLegendItems(legendKeys, "square", showInLegend, legendColors);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    const handleGroupMouseOver = (group: d3.ChordGroup, element: Element, event: MouseEvent) => {
        const datum = datumForGroup(group);
        const color = colorFor(group.index) as IColor;
        const name = keyForGroup(group);

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && onTooltip({ datum, event, name, value: datum[value], color });
    };

    const handleGroupMouseOut = (group: d3.ChordGroup, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(datumForGroup(group), element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleGroupClick = (group: d3.ChordGroup, element: Element, event: MouseEvent) => {
        onClick && onClick(datumForGroup(group), element, event);
    };

    const handleRibbonMouseOver = (chord: d3.Chord, element: Element, event: MouseEvent) => {
        const datum = datumForChord(chord);
        const color = colorFor(chord.source.index) as IColor;
        const name = `${names[chord.source.index]} → ${names[chord.target.index]}`;

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && onTooltip({ datum, event, name, value: datum[value], color });
    };

    const handleRibbonMouseOut = (chord: d3.Chord, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(datumForChord(chord), element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleRibbonClick = (chord: d3.Chord, element: Element, event: MouseEvent) => {
        onClick && onClick(datumForChord(chord), element, event);
    };

    const Shapes = useCanvas ? CanvasChordShapesPlot : SVGChordShapesPlot;
    const Labels = useCanvas ? CanvasLabelsPlot : SVGLabelsPlot;

    return (
        <React.Fragment>
            <Shapes
                renderVirtualCanvas={renderVirtualCanvas}
                cx={cx}
                cy={cy}
                groups={groups}
                chords={chords}
                groupArcGenerator={groupArcGenerator}
                ribbonGenerator={ribbonGenerator}
                innerRadiusPx={innerRadiusPx}
                outerRadiusPx={outerRadiusPx}
                cornerRadius={cornerRadius}
                colorFor={colorFor}
                keyForGroup={keyForGroup}
                keyForChord={keyForChord}
                interactive={interactive}
                onGroupMouseOver={handleGroupMouseOver}
                onGroupMouseOut={handleGroupMouseOut}
                onGroupClick={handleGroupClick}
                onRibbonMouseOver={handleRibbonMouseOver}
                onRibbonMouseOut={handleRibbonMouseOut}
                onRibbonClick={handleRibbonClick}
            />
            <Labels
                renderVirtualCanvas={renderVirtualCanvas}
                className="chord-label"
                items={labels ? groups : []}
                keyFor={keyForGroup}
                x={labelX}
                y={labelY}
                text={keyForGroup}
                textAnchor={labelAnchor}
                color={theme.label.color.toString()}
                fontSize={theme.label.fontSize}
                fontFamily={theme.label.fontFamily}
            />
        </React.Fragment>
    );
}

ChordPlot.requiresVirtualCanvas = true;
ChordPlot.isPlot = true;
