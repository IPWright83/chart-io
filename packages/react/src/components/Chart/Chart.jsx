import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useStore } from "react-redux";

import { VirtualCanvas } from "../VirtualCanvas";

// import { getColumnInfos } from "@chart-it/detection";
import { chartActions } from "../../store";

import { getChildrenWithProps } from "./getChildrenWithProps";
import { getTheme } from "./getTheme";

const Chart = ({
    children,
    animationDuration,
    width,
    height,
    margin,
    data,
    useCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
    theme = "light",
}) => {
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
            store.dispatch(chartActions.setTheme(theme));
        }
    }, [store.dispatch, theme]);

    // We need to extend the child components to provide the common props. We do this by
    // cloning them and piping the common props down
    const childrenWithProps = getChildrenWithProps({
        children,
        useCanvas,
        onMouseOver,
        onMouseOut,
        onClick,
        animationDuration,
    });

    const themeOrCustom = getTheme(theme);

    return (
        <svg className="chart-svg" width={width} height={height} style={{ backgroundColor: themeOrCustom.background }}>
            {useCanvas ? (
                <VirtualCanvas onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
                    {childrenWithProps}
                </VirtualCanvas>
            ) : (
                childrenWithProps
            )}
        </svg>
    );
};

Chart.propTypes = {
    /**
     * The child components for the chart
     * @type {Array<Node> || Node}
     */
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

    /**
     * The width of the chart
     * @default 500
     * @type {Number}
     */
    width: PropTypes.number.isRequired,

    /**
     * The height of the chart
     * @default 500
     * @type {Number}
     */
    height: PropTypes.number.isRequired,

    /**
     * The time in milliseconds to spend animating data transitions
     * @default 250
     * @type {Number}
     */
    animationDuration: PropTypes.number,

    /**
     * The margin of the chart
     * @type {Object}
     */
    margin: PropTypes.shape({
        /**
         * The top margin
         * @default 30
         * @type {Number}
         */
        top: PropTypes.number,

        /**
         * The right margin
         * @default 30
         * @type {Number}
         */
        right: PropTypes.number,

        /**
         * The bottom margin
         * @default 30
         * @type {Number}
         */
        bottom: PropTypes.number,

        /**
         * The left margin
         * @default 30
         * @type {Number}
         */
        left: PropTypes.number,
    }),

    /**
     * The data for the chart
     * @type {Object[]}
     */
    data: PropTypes.array,

    /**
     * Should all the plots use an HTML Canvas instead of SVG?
     * @default false
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,

    /**
     * A function that will be triggered whenever the mouse moves over an element for the first time
     * @default undefined
     * @type {Function}
     */
    onMouseOver: PropTypes.func,

    /**
     * A function that will be triggered whenever the mouse moves out an element
     * @default undefined
     * @type {Function}
     */
    onMouseOut: PropTypes.func,

    /**
     * A function that will be triggered whenever the mouse clicks on an element
     * @default undefined
     * @type {Function}
     */
    onClick: PropTypes.func,

    /**
     * The name of the theme to use
     * @type {[type]}
     */
    theme: PropTypes.oneOfType([PropTypes.oneOf(["light", "dark"]), PropTypes.object]),
};

Chart.defaultProps = {
    width: 500,
    height: 500,
    animationDuration: 250,
    margin: {
        left: 40,
        right: 40,
        bottom: 40,
        top: 40,
    },
    data: [],
    useCanvas: false,
};

export { Chart };
