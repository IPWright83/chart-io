import * as d3 from "@chart-io/d3";
import { chartSelectors, IState } from "@chart-io/core";
import { IEventPlotProps } from "@chart-io/types";
import { scatter } from "@chart-io/core";
import type { Transition } from "@chart-io/d3";

import { useSelector } from "react-redux";

import { useFocused } from "./useFocused";
import { useTooltip } from "./useTooltip";

import { useLegendItem, useRender } from "../../../../hooks";
import { renderCanvas } from "../../renderCanvas";

export interface IScatterBaseProps extends IEventPlotProps {
    /**
     * The optional key of the field used for the relative z size. This overrides the radius
     */
    z?: string;
    /**
     * The fixed radius to use for points. This is ignored if z is provided
     */
    radius?: number;
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: Transition<Element, unknown, any, unknown>) => void;
}

/**
 * Represents a base Scatter plot that is common across both SVG and Canvas based charts
 * @param  props       The set of React properties
 * @return             The Scatter plot component
 */
export function ScatterBase({
    x,
    y,
    z,
    canvas,
    renderVirtualCanvas,
    radius = 5,
    color,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
}: IScatterBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const zScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, z, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    const strokeColor = fillColor.darker();
    fillColor.opacity = theme.series.opacity;

    useLegendItem(y, "circle", showInLegend, fillColor);

    const onFocus = useFocused({ xScale, yScale });
    const onTooltip = useTooltip({ x, y });

    // This is the main render function
    useRender(() => {
        const { update, exit } = scatter.render({
            animationDuration,
            interactive,
            radius,
            layer: layer.current,
            data,
            fillColor,
            strokeColor,
            onMouseOver,
            onMouseOut,
            onClick,
            onFocus,
            onTooltip,
            theme,
            x,
            y,
            z,
            xScale,
            yScale,
            zScale,
        });

        renderCanvas(canvas, renderVirtualCanvas, width, height, update, exit);
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
