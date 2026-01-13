/**
 * De-register mouse events on the virtal canvas
 * @param  canvas             The virtual canvas DOM element
 * @param  clickHandler       The click handler function to remove
 * @param  moveHandler        The move handler function to remove
 */
export function removeEventHandlers(
    canvas: HTMLCanvasElement | null | undefined,
    clickHandler?: (e: MouseEvent) => void,
    moveHandler?: (e: MouseEvent) => void
) {
    if (!canvas) {
        // istanbul ignore next
        return;
    }

    if (clickHandler) canvas.removeEventListener("click", clickHandler);
    if (moveHandler) canvas.removeEventListener("mousemove", moveHandler);
}
