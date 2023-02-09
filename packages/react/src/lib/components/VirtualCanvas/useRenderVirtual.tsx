import type { IOnMouseOver, IOnMouseOut, IOnClick, IDatum } from "@d3-chart/types";
import { debounce } from "lodash";
import { useRef } from "react";
import { useStore, useSelector } from "react-redux";
import { chartSelectors, IState } from "../../store";
import {
    addEventHandlers,
    clearVirtualCanvas,
    removeEventHandlers,
    renderVirtualCanvas,
    IColorToDataMap,
} from "../../hoc/canvas/virtual";

import type { IRenderVirtualCanvasFunc } from "./getChildrenWithProps";

export const VIRTUAL_CANVAS_DEBOUNCE = 100;

export function useRenderVirtual(
    canvas?: HTMLCanvasElement,
    onMouseOver?: IOnMouseOver,
    onMouseOut?: IOnMouseOut,
    onClick?: IOnClick
) {
    // This is going to be used for the main color -> datum lookup.
    // We need to use a useRef so dependencies (wiring up events) don't re-occur forcing a re-render loop
    const colorToData = useRef<IColorToDataMap>({});

    // EventHandlers get added with a reference to colorToData, however
    // each time this changes we need to replace the event handlers. So keep
    // a reference so we can remove them
    const clickEventHandler = useRef<(e: MouseEvent) => void>();
    const moveEventHandler = useRef<(e: MouseEvent) => void>();

    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const store = useStore();

    let nodes = [];

    // Render all the virtual nodes - this is debounced to ensure that we only trigger it once
    // after all of the child layers finished their render as we don't want layers to overwrite each other
    const renderAllVirtualNodes = debounce(async () => {
        console.log("renderAllVirtualNodes", canvas);
        if (!canvas) {
            return;
        }

        // Clear and re-render the virtual canvas
        clearVirtualCanvas(canvas, width, height);
        colorToData.current = await renderVirtualCanvas(canvas, width, height, nodes);
        nodes = [];

        // Remove the old event handlers
        removeEventHandlers(canvas, clickEventHandler.current, moveEventHandler.current);

        // Replace the old canvas handlers
        const { clickHandler, moveHandler } = addEventHandlers(canvas, colorToData.current, store.dispatch);

        // Update the handler so they can be removed next time
        clickEventHandler.current = clickHandler;
        moveEventHandler.current = moveHandler;
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

    return renderVirtual;
}
