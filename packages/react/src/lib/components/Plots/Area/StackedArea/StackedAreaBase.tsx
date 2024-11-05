import * as d3 from "@chart-io/d3";
import { area, chartSelectors, IState } from "@chart-io/core";
import type { IColor, IEventPlotProps } from "@chart-io/types";

import { useState } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { useDatumFocus } from "./useDatumFocus";
import { useMultiPathCreator } from "./useMultiPathCreator";
import { useTooltip } from "./useTooltip";

export interface IStackedAreaBaseProps extends Omit<IEventPlotProps, "y"> {
    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;
    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
    /**
     * An optional D3 curve factory
     * See https://d3js.org/d3-shape/curve
     */
    curve?: CurveFactory;
}

/**
 * Represents a stacked Area Plot on an SVG Element
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
export function StackedAreaBase({
    x,
    ys,
    curve,
    colors,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    layer,
    canvas,
}: IStackedAreaBaseProps) {
    const [paths, setPaths] = useState<string>();
    console.log("rendering");

    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, ys[0], scaleMode));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    // Used to create our initial path
    useMultiPathCreator(layer, x, ys, xScale, yScale, canvas);
    useLegendItems(ys, "line", showInLegend, colors);

    /* On future renders we want to update the path */
    useRender(async () => {
        const props = { x, ys, curve, xScale, yScale, data: sortedData, colors, theme };

        // Handle Canvas rendering
        if (canvas) {
            const paths = area.stacked.canvas.render({ ...props, width, height, canvas });
            if (paths) {
                setPaths(paths);
                console.log(paths);
            }

            return;
        }

        const paths = area.stacked.render({ ...props, layer: layer.current, animationDuration });
        if (paths) {
            setPaths(paths);
            console.log(paths);
        }
    }, [x, ys, sortedData, xScale, yScale, layer, animationDuration, theme.series.opacity]);

    // If possible respond to global mouse events for tooltips etc
    useDatumFocus({ interactive, x, ys, xScale, yScale, data: sortedData, colors, paths });
    useTooltip({ x, ys, xScale, yScale, data: sortedData, colors, interactive, paths });

    return null;
}
