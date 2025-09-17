import { bar, chartSelectors, d3, IState } from "@chart-io/core";
import type { IEventPlotProps } from "@chart-io/core";

import { useSelector } from "react-redux";

import { useLegendItem, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IBarBaseProps extends IEventPlotProps {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
}

/**
 * Represents a Bar Plot
 * @param  props       The set of React properties
 * @return             The Bar plot component
 */
export function BarBase({
    x,
    y,
    canvas,
    renderVirtualCanvas,
    color,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
}: IBarBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;

    useLegendItem(x, "square", showInLegend, fillColor);
    const onTooltip = useTooltip({ y });
    const onFocus = useFocused({ yScale, theme, grouped: false });

    useRender(() => {
        const { update } = bar.render({
            animationDuration,
            interactive,
            layer: layer.current,
            data,
            fillColor,
            onMouseOver,
            onMouseOut,
            onClick,
            onFocus,
            onTooltip,
            theme,
            x,
            y,
            xScale,
            yScale,
        });

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        x,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        xScale,
        yScale,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
    ]);

    return null;
}
