import * as d3 from "@chart-it/d3";
import { useSelector, useStore } from "react-redux";
import type { IPlotProps } from "@chart-it/types";

import { chartSelectors, eventSelectors, IState } from "../../../../../store";
import { interpolateMultiPath, isNullOrUndefined } from "../../../../../utils";
import { useLegendItem, useRender } from "../../../../../hooks";

import { useDatumFocus } from "../useDatumFocus";
import { usePathCreator } from "./usePathCreator";
import { useTooltip } from "../useTooltip";

export type ISVGLineProps = Omit<IPlotProps, "canvas">;

/**
 * Represents a Line Plot on an SVG Element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
export function SVGLine({ x, y, color, interactive = true, layer }: ISVGLineProps) {
    const store = useStore();
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y));
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const seriesColor = color || theme.series.colors[0];
    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    // @ts-expect-error: We handle a missing bandwidth fine
    const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0;

    useLegendItem(y, "line", seriesColor);

    // Used to create our initial path
    usePathCreator(layer, x, y, xScale, yScale);

    /* On future renders we want to update the path */
    useRender(() => {
        // Line renderer that starts at the 0 point
        const line = d3
            .line()
            .x((d) => xScale(d[x]) + bandwidth)
            .y((d) => yScale(d[y]))
            .defined((d) => !isNullOrUndefined(d[y]));

        d3.select(layer.current)
            .select("path")
            .datum(sortedData)
            .transition("line")
            .duration(animationDuration)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");

                // @ts-ignore: TODO: Work out how to fix this line
                const current = line(d);
                return interpolateMultiPath(previous, current);
            })
            .style("stroke", `${seriesColor}`)
            .style("stroke-width", "2px");
    }, [x, y, sortedData, xScale, yScale, layer, animationDuration]);

    // If possible respond to global mouse events for tooltips etc
    if (interactive) {
        useDatumFocus(store.dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, seriesColor);
        useTooltip(store.dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, seriesColor);
    }

    return null;
}
