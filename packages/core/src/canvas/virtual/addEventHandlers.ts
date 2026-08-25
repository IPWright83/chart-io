import { eventActions } from "../../store";
import type { IDispatch } from "../../store";
import { MOUSE_MOVE_THROTTLE } from "../../constants";
import type { IDatum } from "../../types";

import { throttle } from "lodash";

import type { IColorToData, IColorToDataMap } from "./types";

/**
 * Crazy interface for TypeScript gymnastics
 */
interface EventElement extends Element {
    __on:
    | {
        find: (handler) => {
            value: (node: HTMLElement, e: MouseEvent, datum: IDatum) => void;
        };
    }
    | undefined;
}

/**
 * Fire the Click event if it exists on the node
 * @param  datum          The datum
 * @param  element        The node that triggered the event
 * @param  e              The MouseEventArgs
 */
const triggerOnClick = (datum: IDatum, element: Element, e: MouseEvent) => {
    const node = element as EventElement;
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
 * @param  element        The node that triggered the event
 * @param  e              The MouseEventArgs
 */
const triggerOnMouseOver = (datum: IDatum, element: Element, e: MouseEvent) => {
    const node = element as EventElement;
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
 * @param  element        The node that triggered the event
 * @param  e              The MouseEventArgs
 */
const triggerOnMouseOut = (datum: IDatum, element: Element, e: MouseEvent) => {
    const node = element as EventElement;
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
 * @param  {Object}      getColorMap         A map from a color to a datum
 * @param  {Function}    dispatch            The redux dispatch function
 * @returns {Object}                         The set of handlers for cleaning up { clickHandler, moveHandler }
 */
export const addEventHandlers = (
    canvas: HTMLCanvasElement,
    getColorMap: () => IColorToDataMap,
    dispatch: IDispatch,
) => {
    let lastDatum = undefined;
    let lastNode = undefined;

    const eventContext = canvas.getContext("2d", { willReadFrequently: true });

    /**
     * Retrieve a datum from the click event
     * @param  e   The MouseEventArgs
     * @return     The datum if found
     */
    const getDatum = (e: MouseEvent): IColorToData | undefined => {
        const colorToData: IColorToDataMap = getColorMap() ?? {};

        // getBoundingClientRect() is recomputed on every event, rather than cached once, since
        // the canvas's position can change after the event handlers are wired up (e.g. the page
        // being scrolled, or the chart's container resizing/reflowing). It's viewport-relative,
        // so it's offset by the current scroll position to line up with pageX/pageY, which are
        // document-relative.
        const rect = canvas.getBoundingClientRect();
        const coords = {
            x: e.pageX - rect.left - window.scrollX,
            y: e.pageY - rect.top - window.scrollY,
        };

        const colorData = eventContext.getImageData(coords.x, coords.y, 1, 1).data;
        const color = `rgb(${colorData[0]}, ${colorData[1]}, ${colorData[2]})`;
        return colorToData[color];
    };

    /**
     * Respond to a Click event
     * @param  {MouseEventArgs} e   The mouse event
     */
    const clickHandler = (e: MouseEvent) => {
        const lookup = getDatum(e);
        if (lookup) {
            const { datum, node } = lookup;
            triggerOnClick(datum, node, e);
        }
    };

    /**
     * Respond to the Mouse Move event
     * @param  {MouseEventArgs} e   The mouse event
     */
    const moveHandler = throttle((e: MouseEvent) => {
        dispatch(eventActions.mouseMove(e));

        const lookup = getDatum(e);
        const datum = lookup?.datum;
        const node = lookup?.node;

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
            lastDatum && triggerOnMouseOut(lastDatum, lastNode, e);
            triggerOnMouseOver(datum, node, e);

            // Tracking variables to help support the onMouseOut events
            lastDatum = datum;
            lastNode = node;
        }
    }, MOUSE_MOVE_THROTTLE);

    // Register the events
    canvas.addEventListener("click", clickHandler);
    canvas.addEventListener("mousemove", moveHandler);
    canvas.addEventListener("mouseout", () => dispatch(eventActions.mouseExit()));
    canvas.addEventListener("mouseover", (e) => dispatch(eventActions.mouseEnter(e)));

    // Return the events so they can be cleaned up, to prevent double registration
    return { clickHandler, moveHandler };
};
