import { chartSelectors, d3, interpolateMultiPath, isNullOrUndefined, IState } from "@chart-io/core";
import type { IPlotProps } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItem, useRender } from "../../../../hooks";

import { IBandwidthScale } from "../../IBandwidthScale";
import { useDatumFocus } from "./useDatumFocus";
import { usePathCreator } from "./usePathCreator";
import { useTooltip } from "./useTooltip";

export function LineBase({
    x,
    y,
    color,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    layer,
    canvas,
}: IPlotProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const seriesColor = color || theme.series.colors[0];
    const sortedData = useMemo(() => data.toSorted((a, b) => d3.ascending(a[x], b[x])), [data, x]);

    useLegendItem(y, "line", showInLegend, seriesColor);

    // Used to create our initial path
    usePathCreator(layer, x, y, xScale, yScale);

    /* On future renders we want to update the path */
    useRender(() => {
        const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;

        // Line renderer that starts at the 0 point
        const lineShape = d3
            .line()
            .x((d) => xScale(d[x]) + bandwidth)
            .y((d) => yScale(d[y]))
            .defined((d) => !isNullOrUndefined(d[y]));

        // Handle Canvas rendering
        if (canvas) {
            const context = canvas.getContext("2d");
            lineShape.context(context);

            // Clear and then re-render the path
            context.clearRect(0, 0, width, height);
            context.beginPath();

            // @ts-ignore: TODO: Need to work out casting
            lineShape(sortedData);

            context.strokeStyle = `${seriesColor}`;
            context.lineWidth = 2;
            context.stroke();

            // Note that because we've drawn directly to the canvas, there is no need
            // for us to use the canvas render loop
            return;
        }

        if (!layer.current) {
            return;
        }

        d3.select(layer.current)
            .select("path")
            .datum(sortedData)
            .transition("line")
            .duration(animationDuration)
            .attrTween("d", function (d) {
                const previous = d3.select(this).attr("d");

                // @ts-ignore: TODO: Work out how to fix this line
                const current = lineShape(d);
                return interpolateMultiPath(previous, current);
            })
            .style("stroke", `${seriesColor}`)
            .style("stroke-width", "2px");
    }, [x, y, sortedData, xScale, yScale, width, height, seriesColor, theme, layer, canvas, animationDuration]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus({ layer, x, y, interactive, xScale, yScale, data: sortedData, color: seriesColor });
    useTooltip({ layer, x, y, interactive, xScale, yScale, data: sortedData, color: seriesColor });
}
