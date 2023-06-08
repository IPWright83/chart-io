import * as d3 from "@chart-it/d3";
import { useSelector, useStore } from "react-redux";
import type { IPlotProps } from "@chart-it/types";

import { chartSelectors, eventSelectors, IState } from "../../../../store";
import { interpolateMultiPath, isNullOrUndefined } from "../../../../utils";
import { useLegendItem, useRender } from "../../../../hooks";

import { IBandwidthScale } from "../../IBandwidthScale";
import { useDatumFocus } from "./useDatumFocus";
import { usePathCreator } from "./usePathCreator";
import { useTooltip } from "./useTooltip";

export interface IAreaBaseProps extends IPlotProps {
    /**
     * The key of the field used for the y2 position for a stream graph
     */
    y2?: string;
}

/**
 * Represents an Area Plot on an SVG Element
 * @param  props       The set of React properties
 * @return             The Line plot component
 */
export function AreaBase({
    x,
    y,
    y2,
    color,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    layer,
    canvas,
}: IAreaBaseProps) {
    const store = useStore();
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;
    const strokeColor = fillColor.darker();

    const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;

    useLegendItem(y, "line", showInLegend, fillColor);

    // Used to create our initial path
    usePathCreator(layer, x, y, xScale, yScale, canvas);

    /* On future renders we want to update the path */
    useRender(() => {
        // Area renderer that starts at the 0 point
        const area = d3
            .area()
            .curve(d3.curveLinear)
            .x((d) => xScale(d[x]) + bandwidth)
            .y0((d) => (y2 ? yScale(d[y]) : yScale.range()[0]))
            .y1((d) => (y2 ? yScale(d[y2]) : yScale(d[y])))
            .defined((d) => !isNullOrUndefined(d[y]));

        // Handle Canvas rendering
        if (canvas) {
            const context = canvas.getContext("2d");
            area.context(context);

            // Clear and then re-render the path
            context.clearRect(0, 0, width, height);
            context.beginPath();

            // @ts-ignore: TODO: Not sure how to fix this
            area(sortedData);

            context.fillStyle = fillColor.toString();
            context.strokeStyle = strokeColor.toString();
            context.fill();
            context.stroke();

            return;
        }

        // Handle SVG Rendering
        d3.select(layer.current)
            .select("path")
            .datum(sortedData)
            .style("fill", fillColor.toString())
            .style("stroke", strokeColor.toString())
            .style("pointer-events", "none")
            .transition("area")
            .duration(animationDuration)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");
                // @ts-ignore: TODO: Not sure how to fix this
                const current = area(d);
                return interpolateMultiPath(previous, current);
            });
    }, [x, y, sortedData, xScale, yScale, layer, canvas, width, height, theme.series.colors, animationDuration]);

    // If possible respond to global mouse events for tooltips etc
    if (interactive) {
        useDatumFocus(store.dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, strokeColor);
        useTooltip(store.dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, strokeColor);
    }

    return null;
}
