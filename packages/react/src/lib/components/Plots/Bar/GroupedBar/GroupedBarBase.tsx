import { bar, chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IEventPlotProps } from "@chart-io/types";

import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IGroupedBarBaseProps extends Omit<IEventPlotProps, "ys" | "x"> {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * The set of x fields to use to access the data for each plot
     */
    xs: Array<string>;
    /**
     * The y field to use to access the data for each plot
     */
    y: string;
    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
}

/**
 * Represents a Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function GroupedBarBase({
    xs,
    y,
    colors,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
    canvas,
    renderVirtualCanvas,
}: IGroupedBarBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, xs[0], scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const onTooltip = useTooltip({ y });
    const onFocus = useFocused({ yScale, theme, grouped: true });

    useLegendItems(xs, "square", showInLegend, colors);

    // prettier-ignore
    useRender(() => {
        const { update } = bar.grouped.render({
            animationDuration,
            interactive,
            layer: layer.current,
            data,
            colors,
            onMouseOver,
            onMouseOut,
            onClick,
            onFocus,
            onTooltip,
            theme,
            xs,
            y,
            xScale,
            yScale,
        });

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [y, xs, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
