import { chartSelectors, IState, line } from "@chart-io/core";
import { d3 } from "@chart-io/core";
import type { IPlotProps } from "@chart-io/types";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItem, useRender } from "../../../../hooks";

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
        const props = { x, y, xScale, yScale, data: sortedData, color: seriesColor, theme };

        // Handle Canvas rendering
        if (canvas) {
            return line.canvas.render({ ...props, height, width, canvas });
        }

        line.render({ ...props, layer: layer.current, animationDuration });
    }, [x, y, sortedData, xScale, yScale, width, height, seriesColor, theme, layer, canvas, animationDuration]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus({ layer, x, y, interactive, xScale, yScale, data: sortedData, color: seriesColor });
    useTooltip({ layer, x, y, interactive, xScale, yScale, data: sortedData, color: seriesColor });
}
