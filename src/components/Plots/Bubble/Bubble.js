import emptyFunction from "emptyfunction";
import PropTypes from "prop-types";
import React from "react";

import { ScatterBase } from "../Scatter";

/**
 * Represents a Bubble Plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Bubble plot component
 */
const Bubble = ({
    x,
    y,
    z,
    color,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
    renderLoop,
    animationDuration,
}) => {
    return (
        <ScatterBase
            layer={layer}
            x={x}
            y={y}
            z={z}
            color={color}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            renderLoop={renderLoop}
            animationDuration={animationDuration}
        />
    );
};

Bubble.propTypes = {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     * @type {HTMLElement}
     */
    layer: PropTypes.object,

    /**
     * The key of the field used for the x position
     * @type {String}
     */
    x: PropTypes.string.isRequired,
    /**
     * The key of the field used for the y position
     * @type {String}
     */
    y: PropTypes.string.isRequired,
    /**
     * The optional key of the field used for the relative z size. This overrides the radius
     * @type {String}
     */
    z: PropTypes.string.isRequired,

    /**
     * The fixed radius to use for points. This is ignored if z is provided
     * @type {Number}
     */
    radius: PropTypes.number,

    /**
     * The color to use for the points
     * @type {String}
     */
    color: PropTypes.string,

    /**
     * A function that will be called once the layer has rendered. This is only used by canvas based plots
     * and triggers a rendering loop to keep up with animations.
     * @default undefined
     * @type {Function}
     */
    renderLoop: PropTypes.func,

    /**
     * A function that will be triggered whenever the mouse moves over an element for the first time
     * @default `() => {}`
     * @type {Function}
     */
    onMouseOver: PropTypes.func,

    /**
     * A function that will be triggered whenever the mouse moves out an element
     * @default `() => {}`
     * @type {Function}
     */
    onMouseOut: PropTypes.func,

    /**
     * A function that will be triggered whenever the mouse clicks on an element
     * @default `() => {}`
     * @type {Function}
     */
    onClick: PropTypes.func,

    /**
     * The time in milliseconds to spend animating data transitions
     * @default 250
     * @type {Number}
     */
    animationDuration: PropTypes.number,
};

Bubble.defaultProps = {
    onMouseOver: emptyFunction,
    onMouseOut: emptyFunction,
    onClick: emptyFunction,
    animationDuration: 250,
    color: "steelblue",
};

export { Bubble };
