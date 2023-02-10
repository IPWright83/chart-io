import { debounce } from "lodash";
import React, { useEffect, useCallback, useRef } from "react";
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
import type { IRenderVirtualCanvasFunc } from "./getChildrenWithProps";

export const VIRTUAL_CANVAS_DEBOUNCE = 100;

export interface IVirtualCanvasProps {
    /**
     * The plots that are children of the virtual canvas
     */
    children: JSX.Element;
}

/**
 * The virtual canvas, draws elements to a non dom canvas and is used to
 * simulate mouse events on these elements
 * @param  {Object} props   The react props
 * @return {ReactElement}   A virtual canvas to add mouse events to canvas layers
 */
export function VirtualCanvas({ children }: IVirtualCanvasProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const store = useStore();

    // This is going to be used for the main color -> datum lookup.
    // We need to use a useRef so dependencies (wiring up events) don't re-occur forcing a re-render loop
    const colorToData = useRef<IColorToDataMap>({});
    const canvasRef = useRef<HTMLCanvasElement>();

    // We can't trigger a useEffect when the colorToData ref changes so
    // instead we use a callback function to ensure we always grab the
    // correct reference when trying to do our data lookups in the
    // addEventHandlers function
    const getColorMap = useCallback(() => colorToData.current, [colorToData.current]);

    // Adds event handlers to the canvas for triggering events
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !store) {
            return;
        }

        const { clickHandler, moveHandler } = addEventHandlers(canvas, getColorMap, store.dispatch);
        return () => {
            removeEventHandlers(canvas, clickHandler, moveHandler);
        };
    }, [canvasRef.current, store, getColorMap]);

    // This is a set of transient nodes, use as part of a debounced render function
    let nodes = [];

    // Render all the virtual nodes - this is debounced to ensure that we only trigger it once
    // after all of the child layers finished their render as we don't want layers to overwrite each other
    const renderAllVirtualNodes = debounce(async () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        // Clear and re-render the virtual canvas
        clearVirtualCanvas(canvas, width, height);
        colorToData.current = await renderVirtualCanvas(canvas, width, height, nodes);
        nodes = [];
    }, VIRTUAL_CANVAS_DEBOUNCE);

    // Whenever a child (canvas layer) renders it'll call this renderVirtual function
    // at the end of its render loop. We need to ensure that all nodes (virtual dom elements)
    // exist within the dataset and then render the virtual canvas
    const renderVirtual: IRenderVirtualCanvasFunc = (update, events) => {
        nodes = [
            ...nodes,
            {
                selection: update,
                events,
            },
        ];

        renderAllVirtualNodes();
    };

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
                <canvas className="virtual-canvas" width={width} height={height} ref={canvasRef} style={style}></canvas>
            </foreignObject>
        </React.Fragment>
    );
}
