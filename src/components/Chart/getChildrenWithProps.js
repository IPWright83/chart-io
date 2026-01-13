import React from "react";

/**
 * Adds some additional props to all the children
 * @param  {Array} options.children                         The children of the component
 * @param  {Boolean} options.useCanvas                      Whether or not the plots should use an HTML canvas
 * @param  {Number} options.useCanvasanimationDuration      The duration to use for animations
 * @param  {Function} options.onMouseOver                   A function that will be triggered whenever the mouse moves over an element for the first time
 * @param  {Function} options.onMouseOut                    A function that will be triggered whenever the mouse moves out an element
 * @param  {Function} options.onClick                       A function that will be triggered whenever the mouse clicks on an element
 * @return {Array}                                          The new children
 */
const getChildrenWithProps = ({
    children,
    useCanvas,
    animationDuration,
    onMouseOver,
    onMouseOut,
    onClick,
}) => {
    // Looks like a single child which is an object
    if (children.props && children.type) {
        children = [children];
    }

    // React children is usually an array
    return children.map((child, index) => {
        const extendedProps = { useCanvas, animationDuration };

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
};

export { getChildrenWithProps };
