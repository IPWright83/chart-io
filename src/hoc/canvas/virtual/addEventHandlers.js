import { throttle } from "lodash";
import { eventActions } from "../../../store";

/**
 * Wire up events on the virtal canvas
 * @param  {HTMLElement} canvas              The virtual canvas DOM element
 * @param  {Object}      colorToData         A map from a color to a datum
 * @param  {Object}      eventHandlers       The collection of event handlers to use
 * @param  {Function}    dispatch            The redux dispatch function
 * @returns {Object}                         The set of handlers for cleaning up { clickHandler, moveHandler }
 */
const addEventHandlers = (canvas, colorToData, eventHandlers, dispatch) => {
    const { onMouseOver, onMouseOut, onClick } = eventHandlers;

    let lastDatum = null;

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
        return colorToData.current[color];
    };

    /**
     * Respond to a Click event
     * @param  {MouseEventArgs} e   The mouse event
     */
    const clickHandler = (e) => {
        const datum = getDatum(e);
        datum && onClick && onClick(datum, undefined, e);
    };

    /**
     * Respond to the Mouse Move event
     * @param  {MouseEventArgs} e   The mouse event
     */
    const moveHandler = throttle((e) => {
        dispatch(eventActions.mouseMove(e));

        const datum = getDatum(e);

        // Moving with a point
        if (datum === lastDatum) {
            return;
        }

        // Moving over the background from a point
        if (!datum && lastDatum) {
            onMouseOut(lastDatum, undefined, e);
            lastDatum = null;
        }

        if (datum) {
            // Exit the last point
            lastDatum && onMouseOut && onMouseOut(lastDatum, undefined, e);

            // Enter the new point
            onMouseOver && onMouseOver(datum, undefined, e);
            lastDatum = datum;
        }
    }, 10);

    // Register the events
    canvas.addEventListener("click", clickHandler);
    canvas.addEventListener("mousemove", moveHandler);
    canvas.addEventListener("mouseout", (e) => dispatch(eventActions.mouseExit(e)));
    canvas.addEventListener("mouseover", (e) => dispatch(eventActions.mouseEnter(e)));

    // Return the events so they can be cleaned up, to prevent double registration
    return { clickHandler, moveHandler };
};

export { addEventHandlers };
