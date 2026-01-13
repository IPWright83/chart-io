import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Background } from "../Background";
import { Droplines } from "../Droplines";
import { Legend } from "../Legend";
import { Markers } from "../Markers";
import { VirtualCanvas } from "../VirtualCanvas";

import { getColumnInfos } from "../../detection";
import { chartActions, chartSelectors } from "../../store";

import { getChildrenWithProps } from "./getChildrenWithProps";

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
    theme,
    ...props
}) => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((s) => chartSelectors.theme(s));

    // Ensure that the store is updated whenever the dimensions change. This typically
    // triggers scale recalculations which should trigger cascading updates
    useEffect(() => {
        dispatch(chartActions.setDimensions(width, height, margin));
    }, [dispatch, width, height, margin]);

    // Ensure that the data used by all plots is updated in the store
    useEffect(() => {
        dispatch(chartActions.setData(data));
    }, [dispatch, data]);

    useEffect(() => {
        dispatch(chartActions.setAnimationDuration(animationDuration));
    }, [dispatch, animationDuration]);

    useEffect(() => {
        if (theme) {
            dispatch(chartActions.setTheme(theme));
        }
    }, [dispatch, theme]);

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

    return (
        <div className="chart" style={{ backgroundColor: currentTheme.background }}>
            <svg width={width} height={height}>
                <Background />
                {useCanvas ? (
                    <VirtualCanvas onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
                        {childrenWithProps}
                    </VirtualCanvas>
                ) : (
                    childrenWithProps
                )}
                <Markers />
                <Droplines />
            </svg>
        </div>
    );
};

Chart.propTypes = {
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
};

Chart.defaultProps = {
    width: 500,
    height: 500,
    animationDuration: 250,
    margin: {
        left: 30,
        right: 30,
        bottom: 30,
        top: 30,
    },
    data: [],
    useCanvas: false,
};

export { Chart };
