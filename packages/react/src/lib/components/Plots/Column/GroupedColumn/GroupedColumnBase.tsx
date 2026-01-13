import { chartSelectors, column, IState } from "@chart-io/core";
import type { IColor, IEventPlotProps } from "@chart-io/types";
import type { Transition } from "@chart-io/d3";

import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IGroupedColumnBaseProps extends Omit<IEventPlotProps, "y"> {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: Transition<Element, unknown, any, unknown>) => void;
    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;

    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
}

/**
 * Represents a Groupled Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function GroupedColumnBase({
    x,
    ys,
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
}: IGroupedColumnBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, ys[0], scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const onTooltip = useTooltip({ x });
    const onFocus = useFocused({ xScale, theme, grouped: true });

    useLegendItems(ys, "square", showInLegend, colors);

    useRender(() => {
        const { update } = column.grouped.render({
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
            x,
            ys,
            xScale,
            yScale,
        });

        // @ts-ignore: TODO: Work out how to fix this
        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [x, ys, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
