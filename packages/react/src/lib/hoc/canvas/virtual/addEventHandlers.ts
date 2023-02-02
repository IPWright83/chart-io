import type { IDatum } from "@d3-chart/types";
import { throttle } from "lodash";

import type { IColorToDataMap } from "./types";

import { eventActions, IDispatch } from "../../../store";
import { MOUSE_MOVE_THROTTLE } from "../../../constants";

/**
 * Fire the Click event if it exists on the node
 * @param  datum          The datum
 * @param  node           The node that triggered the event
 * @param  e              The MouseEventArgs
 */
const triggerOnClick = (datum: IDatum, node: Element, e: MouseEvent) => {
    if (!node || !node.__on) {
        // istanbul ignore next
        return;
    }

    const onClick = node.__on.find((handler) => handler.type === "click");
    if (onClick) {
        onClick.value.call(node, e, datum);
    }
};

/**
 * Fire the MouseOver event if it exists on the node
 * @param  datum          The datum
 * @param  node           The node that triggered the event
 * @param  e              The MouseEventArgs
 */
const triggerOnMouseOver = (datum: IDatum, node: Element, e: MouseEvent) => {
    if (!node || !node.__on) {
        // istanbul ignore next
        return;
    }

    const onMouseOver = node.__on.find((handler) => handler.type === "mouseover");
    if (onMouseOver) {
        onMouseOver.value.call(node, e, datum);
    }
};

/**
 * Fire the MouseOut event if it exists on the node
 * @param  datum          The datum
 * @param  node           The node that triggered the event
 * @param  e              The MouseEventArgs
 */
const triggerOnMouseOut = (datum: IDatum, node: Element, e: MouseEvent) => {
    if (!node || !node.__on) {
        // istanbul ignore next
        return;
    }

    const onMouseOut = node.__on.find((handler) => handler.type === "mouseout");
    if (onMouseOut) {
        onMouseOut.value.call(node, e, datum);
    }
};

/**
 * Wire up events on the virtal canvas
 * @param  {HTMLElement} canvas              The virtual canvas DOM element
 * @param  {Object}      colorToData         A map from a color to a datum
 * @param  {Function}    dispatch            The redux dispatch function
 * @returns {Object}                         The set of handlers for cleaning up { clickHandler, moveHandler }
 */
export const addEventHandlers = (canvas: HTMLCanvasElement, colorToData: IColorToDataMap, dispatch: IDispatch) => {
    let lastDatum = undefined;
    let lastNode = undefined;

    // This is a fairly slow operation so let's do it just the once
    const rect = canvas.getBoundingClientRect();
    const eventContext = canvas.getContext("2d");

    /**
     * Retrieve a datum from the click event
     * @param  {Object} e   The MouseEventArgs
     * @return {Object}     The datum if found
     */
    const getDatum = (e) => {
        const coords = {
            x: e.pageX - rect.left,
            y: e.pageY - rect.top,
        };

        const colorData = eventContext.getImageData(coords.x, coords.y, 1, 1).data;
        const color = `rgb(${colorData[0]}, ${colorData[1]}, ${colorData[2]})`;
        return colorToData.current[color] || {};
    };

    /**
     * Respond to a Click event
     * @param  {MouseEventArgs} e   The mouse event
     */
    const clickHandler = (e) => {
        const { datum, node } = getDatum(e);
        triggerOnClick(datum, node, e);
    };

    /**
     * Respond to the Mouse Move event
     * @param  {MouseEventArgs} e   The mouse event
     */
    const moveHandler = throttle((e) => {
        dispatch(eventActions.mouseMove(e));

        const { datum, node } = getDatum(e);

        // Moving within a point
        if (datum === lastDatum) {
            return;
        }

        // Moving over the background from a point
        if (!datum && lastDatum) {
            // onMouseOut(lastDatum, undefined, e);
            triggerOnMouseOut(lastDatum, lastNode, e);

            // Clear out tracking variables
            lastDatum = undefined;
            lastNode = undefined;
        }

        if (datum) {
            // Trigger the onMouseOver event provided by the Plot. This allows
            // for custom rendering/interaction on a per plot basis.
            triggerOnMouseOut(lastDatum, lastNode, e);
            triggerOnMouseOver(datum, node, e);

            // Tracking variables to help support the onMouseOut events
            lastDatum = datum;
            lastNode = node;
        }
    }, MOUSE_MOVE_THROTTLE);

    // Register the events
    canvas.addEventListener("click", clickHandler);
    canvas.addEventListener("mousemove", moveHandler);
    canvas.addEventListener("mouseout", (e) => dispatch(eventActions.mouseExit(e)));
    canvas.addEventListener("mouseover", (e) => dispatch(eventActions.mouseEnter(e)));

    // Return the events so they can be cleaned up, to prevent double registration
    return { clickHandler, moveHandler };
};
