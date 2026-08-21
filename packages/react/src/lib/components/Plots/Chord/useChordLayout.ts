import { chartSelectors, d3, ensureCombinationsAreUnique, IState } from "@chart-io/core";
import type { IColor, IDatum } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

// The margin, in pixels, reserved outside the group arcs for node labels, so label text doesn't get
// clipped at the plot's outer boundary - the same purpose as `<Dendrogram radial>`'s `layoutRadius` reserve
const LABEL_MARGIN = 40;

export interface IUseChordLayoutProps {
    source: string;
    target: string;
    value: string;
    thickness: number;
    labels: boolean;
    padAngle: number;
    cornerRadius: number;
    sort: boolean;
    colors?: IColor[];
}

/**
 * Computes the chord layout shared by a Chord's shapes (group arcs + ribbons) and labels - the node
 * list, flow matrix, group/chord angles, colors and label positions - so it only runs once per render
 * rather than being repeated by each of the two, which instead just render from the values this
 * returns. Reads cx/cy/maxRadius directly from the chart's plot dimensions, rather than via
 * `withRadialPlot`, since that HOC also ties itself to a single Canvas/SVG layer - which no longer
 * applies once the shapes and labels each have their own
 * @param  props       The set of properties needed to build the layout
 * @return             The computed layout, plus legend data
 */
export function useChordLayout({
    source,
    target,
    value,
    thickness,
    labels,
    padAngle,
    cornerRadius,
    sort,
    colors,
}: IUseChordLayoutProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const cx = useSelector((s: IState) => chartSelectors.dimensions.plot.cx(s));
    const cy = useSelector((s: IState) => chartSelectors.dimensions.plot.cy(s));
    const maxRadius = useSelector((s: IState) => chartSelectors.dimensions.plot.maxRadius(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const palette = colors ?? theme.series.colors;
    const names = useMemo(
        () => Array.from(new Set(data.flatMap((row) => [`${row[source]}`, `${row[target]}`]))),
        [data, source, target],
    );
    const legendColors = useMemo(() => names.map((_, index) => palette[index % palette.length]), [names, palette]);

    const layout = useMemo(() => {
        ensureCombinationsAreUnique(data, [source, target], "Chord");

        const indexOf = new Map(names.map((name, index) => [name, index]));

        // A row whose source equals its target has nowhere meaningful to be drawn - a chord always
        // connects two distinct groups - so it's left out of the matrix entirely, the same way
        // `buildHierarchy` treats a negative value as 0 rather than producing a broken layout
        const matrix = names.map(() => names.map(() => 0));
        const rowFor = new Map<string, IDatum>();
        data.forEach((row) => {
            const sourceName = `${row[source]}`;
            const targetName = `${row[target]}`;
            if (sourceName === targetName) return;

            matrix[indexOf.get(sourceName)][indexOf.get(targetName)] += Math.max(0, Number(row[value]) || 0);
            rowFor.set(`${sourceName}|${targetName}`, row);
        });

        // The outer radius shrinks to leave room for labels, so callers don't need to reason about
        // two radii themselves - just how thick the ring should be
        const outerRadiusPx = Math.max(0, maxRadius - (labels ? LABEL_MARGIN : 0));
        const innerRadiusPx = Math.max(0, outerRadiusPx - thickness);

        const chordLayout = d3
            .chord()
            .padAngle(padAngle)
            .sortGroups(sort ? d3.descending : null);
        const allChords = chordLayout(matrix);
        const groups = allChords.groups;

        const groupArcGenerator = d3
            .arc<d3.ChordGroup>()
            .innerRadius(innerRadiusPx)
            .outerRadius(outerRadiusPx)
            .cornerRadius(cornerRadius);
        const ribbonGenerator = d3.ribbon<d3.Chord, d3.ChordSubgroup>().radius(innerRadiusPx);

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(names).range(palette);
        const colorFor = (index: number) => colorScale(names[index]).toString();

        const keyForGroup = (group: d3.ChordGroup) => names[group.index];
        const keyForChord = (chord: d3.Chord) => `${names[chord.source.index]}>${names[chord.target.index]}`;

        // A group represents a node's combined in/out flow, which has no single row of its own - a
        // synthetic aggregate datum, the same convention `buildHierarchy` uses for a non-leaf node
        const datumForGroup = (group: d3.ChordGroup): IDatum => ({ [source]: names[group.index], [value]: group.value });

        // A ribbon's source/target is whichever direction d3.chord() picked as the larger of the two
        // flows - fall back to a synthetic datum if that exact (source, target) row isn't in the data
        // (e.g. only the reverse direction was provided)
        const datumForChord = (chord: d3.Chord): IDatum =>
            rowFor.get(`${names[chord.source.index]}|${names[chord.target.index]}`) ?? {
                [source]: names[chord.source.index],
                [target]: names[chord.target.index],
                [value]: chord.source.value,
            };

        // Positioned just outside the group arcs, on the same angle as the arc's midpoint, anchored
        // away from the center on either half of the circle - the same convention as
        // `<Dendrogram radial>`'s leaf labels
        const labelRadius = outerRadiusPx + 6;
        const labelAngle = (group: d3.ChordGroup) => (group.startAngle + group.endAngle) / 2;
        const labelX = (group: d3.ChordGroup) => cx + labelRadius * Math.sin(labelAngle(group));
        const labelY = (group: d3.ChordGroup) => cy - labelRadius * Math.cos(labelAngle(group));
        const labelAnchor = (group: d3.ChordGroup) => (labelAngle(group) > Math.PI ? "end" : "start");

        return {
            names,
            groups,
            chords: allChords,
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
        };
    }, [data, source, target, value, thickness, labels, padAngle, cornerRadius, sort, cx, cy, maxRadius, names, palette]);

    return { ...layout, cx, cy, legendKeys: names, legendColors };
}
