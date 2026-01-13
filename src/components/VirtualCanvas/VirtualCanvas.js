import "./VirtualCanvas.css";

import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    addEventHandlers,
    clearVirtualCanvas,
    removeEventHandlers,
    renderVirtualCanvas,
} from "../../hoc/canvas/virtual";
import { chartSelectors } from "../../store";
import { getChildrenWithProps } from "./getChildrenWithProps";

// These types of layers don't need a virtual canvas
// as they don't/can't support events in the same way
// a layer with physical elements can
const ignoreTypes = ["XAxis", "YAxis", "Axis", "XScale", "YScale", "ZScale", "Scale", "Line", "Lines", "Area", "Areas"];

/**
 * The virtual canvas, draws elements to a non dom canvas and is used to
 * simulate mouse events on these elements
 * @param  {Object} props   The react props
 * @return {ReactElement}   A virtual canvas to add mouse events to canvas layers
 */
const VirtualCanvas = (props) => {
    const { children, onMouseOver, onMouseOut, onClick } = props;

    // This is going to be used for the main color -> datum lookup.
    // We need to use a useRef so dependencies (wiring up events) don't re-occur forcing a re-render loop
    const colorToData = useRef({});
    const canvas = useRef(null);
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const dispatch = useDispatch();

    // Render all the virtual nodes - this is debounced to ensure that we only trigger it once
    // after all of the child layers finished their render as we don't want layers to overwrite each other
    let nodes = [];
    const renderAllVirtualNodes = debounce(async () => {
        clearVirtualCanvas(canvas.current, width, height);
        colorToData.current = await renderVirtualCanvas(canvas.current, width, height, nodes);
        nodes = [];
    }, 100);

    // Whenever a child (canvas layer) renders it'll call this renderVirtual function
    // at the end of its render loop. We need to ensure that all nodes (virtual dom elements)
    // exist within the dataset and then render the virtual canvas
    const renderVirtual = (update) => {
        nodes = [...nodes, update];
        renderAllVirtualNodes();
    };

    // Register some virtual canvas event handlers
    useEffect(() => {
        const canvasElement = canvas.current;
        if (!canvasElement) {
            return;
        }

        const { clickHandler, moveHandler } = addEventHandlers(
            canvasElement,
            colorToData,
            {
                onMouseOver,
                onMouseOut,
                onClick,
            },
            dispatch
        );

        // Ensure we clean up the handlers otherwise they'll double fire
        return () => {
            removeEventHandlers(canvasElement, clickHandler, moveHandler);
        };
    }, [canvas, colorToData, onClick, onMouseOut, onMouseOver, dispatch]);

    // Many layers don't require the virtual canvas. If
    // they are all of these types then disable the canvas
    const childTypes = children.filter((c) => !!c).map((c) => c.props.mdxType);
    const typesNeedingCanvas = childTypes.filter((type) => !ignoreTypes.includes(type));
    const includeVirtualCanvas = typesNeedingCanvas.length > 0;

    if (includeVirtualCanvas === false) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    // We need to extend the child components to provide the renderVirtual callback down
    // which will automatically be called by any Canvas based layers
    const childrenWithProps = getChildrenWithProps({
        children,
        renderVirtualCanvas: renderVirtual,
    });

    return (
        <React.Fragment>
            {childrenWithProps}
            <foreignObject className="fo" width={width} height={height}>
                <canvas className="virtual-canvas" width={width} height={height} ref={canvas}></canvas>
            </foreignObject>
        </React.Fragment>
    );
};

VirtualCanvas.propTypes = {
    /**
     * The plots that are children of the virtual canvas
     * @type {Array}
     */
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

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
};

VirtualCanvas.defaultProps = {
    onMouseOver: () => {},
    onMouseOut: () => {},
    onClick: () => {},
};

export { VirtualCanvas };
