import type { IOnClick, IOnMouseOut, IOnMouseOver } from "@d3-chart/types";
import React from "react";

/**
 * Set of props on the children, once extended with events
 */
interface IExtendedProps {
    useCanvas: boolean;
    animationDuration: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Adds some additional props to all the children
 * @param  children                        The children of the component
 * @param  useCanvas                       Whether or not the plots should use an HTML canvas
 * @param  animationDuration               The duration to use for animations
 * @param  onMouseOver                     A function that will be triggered whenever the mouse moves over an element for the first time
 * @param  onMouseOut                      A function that will be triggered whenever the mouse moves out an element
 * @param  onClick                         A function that will be triggered whenever the mouse clicks on an element
 * @return                                 The new children
 */
export function getChildrenWithProps(
    children: any,
    useCanvas: boolean,
    animationDuration: number,
    onMouseOver?: IOnMouseOver,
    onMouseOut?: IOnMouseOut,
    onClick?: IOnClick
) {
    // Looks like a single child which is an object
    if (children.props && children.type) {
        children = [children];
    }

    // Children can contain arrays within there, so we want to flatten
    // out the structure so that cloning works correctly
    return children.flat().map((child, index) => {
        const extendedProps: IExtendedProps = { useCanvas, animationDuration };

        // Allow event handlers to be defined once at the chart level, but
        // don't override them on individual plots if they're not defined
        if (onMouseOver) {
            extendedProps.onMouseOver = onMouseOver;
        }
        if (onMouseOut) {
            extendedProps.onMouseOut = onMouseOut;
        }
        if (onClick) {
            extendedProps.onClick = onClick;
        }

        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...extendedProps, key: index });
        }

        return child;
    });
}
