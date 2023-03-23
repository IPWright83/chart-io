import type { IData, IMargin, IOnClick, IOnMouseOut, IOnMouseOver, ITheme } from "@d3-chart/types";
import React, { useEffect } from "react";
import { useStore } from "react-redux";

import { VirtualCanvas } from "../VirtualCanvas";

// import { getColumnInfos } from "@d3-chart/detection";
import { chartActions } from "../../store";

import { getChildrenWithProps } from "./getChildrenWithProps";
import { getTheme } from "./getTheme";

const DEFAULT_MARGIN = { left: 30, top: 30, right: 30, bottom: 30 };

export interface IChartBaseProps {
    /**
     * The child components for the chart
     */
    children?: JSX.Element | JSX.Element[];
    /**
     * The time in milliseconds to spend animating data transitions
     * @default 250
     */
    animationDuration?: number;
    /**
     * The width of the chart
     * @default 500
     */
    width?: number;
    /**
     * The height of the chart
     * @default 500
     */
    height?: number;
    /**
     * The margin of the chart
     * @default { left: 30, top: 30, right: 30, bottom: 30 }
     */
    margin?: IMargin;
    /**
     * The data for the chart
     */
    data?: IData;
    /**
     * Should all the plots use an HTML Canvas instead of SVG?
     * @default false
     */
    useCanvas?: boolean;
    /**
     * A function that will be triggered whenever the mouse moves over an element for the first time
     * @default undefined
     */
    onMouseOver?: IOnMouseOver;
    /**
     * A function that will be triggered whenever the mouse moves out an element
     * @default undefined
     */
    onMouseOut?: IOnMouseOut;
    /**
     * A function that will be triggered whenever the mouse clicks on an element
     * @default undefined
     */
    onClick?: IOnClick;
    /**
     * The name of the theme to use or a custom theme
     * @default "light"
     */
    theme?: "light" | "dark" | ITheme;
}

export function Chart({
    children,
    animationDuration = 250,
    width = 500,
    height = 500,
    margin = DEFAULT_MARGIN,
    data,
    useCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
    theme = "light" as const,
}: IChartBaseProps) {
    const store = useStore();

    // Ensure that the store is updated whenever the dimensions change. This typically
    // triggers scale recalculations which should trigger cascading updates
    useEffect(() => {
        store.dispatch(chartActions.setDimensions(width, height, margin));
    }, [store.dispatch, width, height, margin]);

    // Ensure that the data used by all plots is updated in the store
    useEffect(() => {
        store.dispatch(chartActions.setData(data));
    }, [store.dispatch, data]);

    useEffect(() => {
        store.dispatch(chartActions.setAnimationDuration(animationDuration));
    }, [store.dispatch, animationDuration]);

    useEffect(() => {
        if (theme) {
            // @ts-ignore: TODO: How do we fix this?
            store.dispatch(chartActions.setTheme(theme));
        }
    }, [store.dispatch, theme]);

    // We need to extend the child components to provide the common props. We do this by
    // cloning them and piping the common props down
    const childrenWithProps = getChildrenWithProps(
        children,
        useCanvas,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick
    );

    const themeOrCustom = getTheme(theme);

    return (
        <svg
            className="chart-svg"
            width={width}
            height={height}
            style={{ backgroundColor: themeOrCustom.background?.toString() }}
        >
            {useCanvas ? <VirtualCanvas>{childrenWithProps}</VirtualCanvas> : childrenWithProps}
        </svg>
    );
}
