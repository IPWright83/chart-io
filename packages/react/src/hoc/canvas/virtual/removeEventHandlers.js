/**
 * De-register mouse events on the virtal canvas
 * @param  {HTMLElement} canvas         The virtual canvas DOM element
 * @param  {Function} clickHandler      The click handler function to remove
 * @param  {Function} moveHandler       The move handler function to remove
 */
const removeEventHandlers = (canvas, clickHandler, moveHandler) => {
    if (!canvas) {
        return;
    }

    if (clickHandler) canvas.removeEventListener("click", clickHandler);
    if (moveHandler) canvas.removeEventListener("mousemove", moveHandler);
};

export { removeEventHandlers };
