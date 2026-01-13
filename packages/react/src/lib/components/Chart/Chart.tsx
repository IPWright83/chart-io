import type { IData, IMargin, IOnClick, IOnMouseOut, IOnMouseOver, ITheme } from "@chart-io/types";
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useStore } from "react-redux";

import { VirtualCanvas } from "../VirtualCanvas";

// import { getColumnInfos } from "@chart-io/detection";
import { chartActions } from "../../store";

import { exportAsImage } from "./exportAsImage";
import { generateRandomID } from "./generateRandomID";
import { getChildrenWithProps } from "./getChildrenWithProps";
import { getTheme } from "./getTheme";

const DEFAULT_MARGIN = { left: 30, top: 30, right: 30, bottom: 30 };

export interface IChartBaseProps {
    /**
     * Optionally override the ID
     */
    id?: string;
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
     * The margin of the plot portion of the chart
     * @default { left: 30, top: 30, right: 30, bottom: 30 }
     */
    plotMargin?: IMargin;
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

export interface IChartRef {
    /**
     * Saves the chart as a PNG or JPG
     * @param  {string} filename     The filename to save the chart to
     * @param {"PNG" | "JPG"} format    The format of the export
     * @param {number} scale            The scale of the image
     * @return {Promise<string>}     Resolves with the PNG data
     */
    exportImage: (filename: string, format?: "PNG" | "JPG", scale?: number) => Promise<string>;
}

export const Chart = forwardRef<IChartRef, IChartBaseProps>((props, ref) => {
    const {
        children,
        id,
        animationDuration = 250,
        width = 500,
        height = 500,
        plotMargin = DEFAULT_MARGIN,
        data,
        useCanvas,
        onMouseOver,
        onMouseOut,
        onClick,
        theme = "light" as const,
    } = props;

    const store = useStore();
    const svgNode = useRef();

    useImperativeHandle(ref, () => ({
        exportImage: exportAsImage(svgNode.current, theme, width, height),
    }));

    // Ensure that the store is updated whenever the dimensions change. This typically
    // triggers scale recalculations which should trigger cascading updates
    useEffect(() => {
        store.dispatch(chartActions.setDimensions(width, height, plotMargin));
    }, [store.dispatch, width, height, plotMargin]);

    // Generate a unique ID for the chart which is required for clip paths
    useEffect(() => {
        store.dispatch(chartActions.setChartID(id ?? generateRandomID()));
    }, [store.dispatch]);

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
        onClick,
    );

    const themeOrCustom = getTheme(theme);

    return (
        <div ref={ref} style={{ display: "inline-block" }}>
            <svg
                className="chart-svg"
                width={width}
                height={height}
                ref={svgNode}
                style={{ backgroundColor: themeOrCustom.background?.toString() }}
            >
                {useCanvas ? <VirtualCanvas>{childrenWithProps}</VirtualCanvas> : childrenWithProps}
            </svg>
        </div>
    );
});

Chart.displayName = "Chart";
