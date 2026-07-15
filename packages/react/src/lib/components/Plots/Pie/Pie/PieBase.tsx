import { chartSelectors, d3, IState, pie } from "@chart-io/core";
import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IPieBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The key of the field used for the category/label of each slice
     */
    x: string;
    /**
     * The key of the field used for the value of each slice
     */
    y: string;
    /**
     * The inner radius of the Pie/Donut, as a fraction (0-1) of the maximum available radius
     * @default 0
     */
    innerRadius?: number;
    /**
     * The outer radius of the Pie/Donut, as a fraction (0-1) of the maximum available radius
     * @default 1
     */
    outerRadius?: number;
    /**
     * The angular gap, in radians, to leave between each slice
     * @default 0.01
     */
    padAngle?: number;
    /**
     * The corner radius, in pixels, to apply to each slice
     * @default 0
     */
    cornerRadius?: number;
    /**
     * Should the slices be sorted by value (descending) rather than using the order of the data?
     * @default false
     */
    sort?: boolean;
    /**
     * The set of colors to use for each category. Defaults to the theme's series colors
     */
    colors?: Array<IColor>;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    /**
     * Should this series feature in the Legend?
     * @default true
     */
    showInLegend?: boolean;
    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * The x-coordinate of the center of the Pie/Donut. Provided by `withPolarPlot`
     */
    cx?: number;
    /**
     * The y-coordinate of the center of the Pie/Donut. Provided by `withPolarPlot`
     */
    cy?: number;
    /**
     * The maximum radius, in pixels, available to the Pie/Donut. Provided by `withPolarPlot`
     */
    maxRadius?: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a Pie/Donut plot
 * @param  props       The set of React properties
 * @return             The Pie plot component
 */
export function PieBase({
    x,
    y,
    canvas,
    renderVirtualCanvas,
    layer,
    cx,
    cy,
    maxRadius,
    innerRadius = 0,
    outerRadius = 1,
    padAngle = 0.01,
    cornerRadius = 0,
    sort = false,
    colors,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IPieBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const palette = colors ?? theme.series.colors;
    const categories = useMemo(() => data.map((d) => `${d[x]}`), [data, x]);
    const legendColors = useMemo(
        () => categories.map((_, index) => palette[index % palette.length]),
        [categories, palette],
    );

    useLegendItems(categories, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        const { update } = pie.render({
            animationDuration,
            interactive,
            layer: layer.current,
            data,
            colors: palette,
            onMouseOver,
            onMouseOut,
            onClick,
            onFocus,
            onTooltip,
            theme,
            x,
            y,
            cx,
            cy,
            maxRadius,
            innerRadius,
            outerRadius,
            padAngle,
            cornerRadius,
            sort,
        });

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        x,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        cx,
        cy,
        maxRadius,
        innerRadius,
        outerRadius,
        padAngle,
        cornerRadius,
        sort,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        palette,
    ]);

    return null;
}
