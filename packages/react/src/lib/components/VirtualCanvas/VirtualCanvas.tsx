import type { IOnMouseOver, IOnMouseOut, IOnClick } from "@d3-chart/types";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useStore, useSelector } from "react-redux";

import {
    addEventHandlers,
    clearVirtualCanvas,
    removeEventHandlers,
    renderVirtualCanvas,
    IColorToDataMap,
} from "../../hoc/canvas/virtual";
import { chartSelectors, IState } from "../../store";

import { getChildrenWithProps } from "./getChildrenWithProps";
import { isVirtualCanvasRequired } from "./isVirtualCanvasRequired";

export const VIRTUAL_CANVAS_DEBOUNCE = 100;

export interface IVirtualCanvasProps {
    /**
     * The plots that are children of the virtual canvas
     */
    children: JSX.Element;
    /**
     * A function that will be triggered whenever the mouse moves over an element for the first time
     * @default `() => {}`
     */
    onMouseOver?: IOnMouseOver;
    /**
     * A function that will be triggered whenever the mouse moves out an element
     * @default `() => {}`
     */
    onMouseOut?: IOnMouseOut;
    /**
     * A function that will be triggered whenever the mouse clicks on an element
     * @default `() => {}`
     */
    onClick?: IOnClick;
}

/**
 * The virtual canvas, draws elements to a non dom canvas and is used to
 * simulate mouse events on these elements
 * @param  {Object} props   The react props
 * @return {ReactElement}   A virtual canvas to add mouse events to canvas layers
 */
export function VirtualCanvas({ children, onMouseOver, onMouseOut, onClick }: IVirtualCanvasProps) {
    // This is going to be used for the main color -> datum lookup.
    // We need to use a useRef so dependencies (wiring up events) don't re-occur forcing a re-render loop
    const colorToData = useRef<IColorToDataMap>({});
    const canvas = useRef(null);
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const store = useStore();

    // Render all the virtual nodes - this is debounced to ensure that we only trigger it once
    // after all of the child layers finished their render as we don't want layers to overwrite each other
    let nodes = [];
    const renderAllVirtualNodes = debounce(async () => {
        clearVirtualCanvas(canvas.current, width, height);
        colorToData.current = await renderVirtualCanvas(canvas.current, width, height, nodes);
        nodes = [];
    }, VIRTUAL_CANVAS_DEBOUNCE);

    // Whenever a child (canvas layer) renders it'll call this renderVirtual function
    // at the end of its render loop. We need to ensure that all nodes (virtual dom elements)
    // exist within the dataset and then render the virtual canvas
    const renderVirtual = (update, events) => {
        nodes = [
            ...nodes,
            {
                selection: update,
                events,
            },
        ];

        renderAllVirtualNodes();
    };

    // Register some virtual canvas event handlers
    useEffect(() => {
        const canvasElement = canvas.current;
        if (!canvasElement) {
            return;
        }

        const { clickHandler, moveHandler } = addEventHandlers(canvasElement, colorToData.current, store.dispatch);

        // Ensure we clean up the handlers otherwise they'll double fire
        return () => {
            removeEventHandlers(canvasElement, clickHandler, moveHandler);
        };
    }, [canvas, colorToData, onClick, onMouseOut, onMouseOver, store.dispatch]);

    // Many layers don't require the virtual canvas. If
    // they are all of these types then disable the canvas
    const includeVirtualCanvas = isVirtualCanvasRequired(children);
    if (includeVirtualCanvas === false) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    // We need to extend the child components to provide the renderVirtual callback down
    // which will automatically be called by any Canvas based layers
    const childrenWithProps = getChildrenWithProps(children, renderVirtual);

    const style = {
        position: "absolute" as const,
        opacity: 0,
        zindex: 10000,
    };

    return (
        <React.Fragment>
            {childrenWithProps}
            <foreignObject className="fo" width={width} height={height}>
                <canvas className="virtual-canvas" width={width} height={height} ref={canvas} style={style}></canvas>
            </foreignObject>
        </React.Fragment>
    );
}
