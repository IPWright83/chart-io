import { chartSelectors, d3, IState, pie } from "@chart-io/core";
import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IStackedDonutBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The key of the field used for the inner ring category
     */
    x: string;
    /**
     * The key of the field used for the outer ring subdivision, within each `x` category
     */
    x2: string;
    /**
     * The key of the field used for the value of each slice
     */
    y: string;
    /**
     * The inner radius of the StackedDonut, as a fraction (0-1) of the maximum available radius
     * @default 0.35
     */
    innerRadius?: number;
    /**
     * The outer radius of the StackedDonut, as a fraction (0-1) of the maximum available radius
     * @default 1
     */
    outerRadius?: number;
    /**
     * The gap, in pixels, to leave between the inner and outer ring
     * @default 2
     */
    ringPadding?: number;
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
     * The set of colors to use for each inner ring category. Defaults to the theme's series colors
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
     * The x-coordinate of the center of the StackedDonut. Provided by `withPolarPlot`
     */
    cx?: number;
    /**
     * The y-coordinate of the center of the StackedDonut. Provided by `withPolarPlot`
     */
    cy?: number;
    /**
     * The maximum radius, in pixels, available to the StackedDonut. Provided by `withPolarPlot`
     */
    maxRadius?: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a StackedDonut plot, a 2-level radial subdivision of `x` (inner ring) and `x2` (outer ring)
 * @param  props       The set of React properties
 * @return             The StackedDonut plot component
 */
export function StackedDonutBase({
    x,
    x2,
    y,
    canvas,
    renderVirtualCanvas,
    layer,
    cx,
    cy,
    maxRadius,
    innerRadius = 0.35,
    outerRadius = 1,
    ringPadding = 2,
    padAngle = 0.01,
    cornerRadius = 0,
    sort = false,
    colors,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IStackedDonutBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    // Only the inner ring categories are shown in the Legend, the outer ring can
    // contain many more values than is practical to list
    const palette = colors ?? theme.series.colors;
    const categories = useMemo(() => Array.from(new Set(data.map((d) => `${d[x]}`))), [data, x]);
    const legendColors = useMemo(
        () => categories.map((_, index) => palette[index % palette.length]),
        [categories, palette],
    );

    useLegendItems(categories, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        const { update } = pie.stacked.render({
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
            x2,
            y,
            cx,
            cy,
            maxRadius,
            innerRadius,
            outerRadius,
            ringPadding,
            padAngle,
            cornerRadius,
            sort,
        });

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        x,
        x2,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        cx,
        cy,
        maxRadius,
        innerRadius,
        outerRadius,
        ringPadding,
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
