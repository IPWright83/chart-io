/**
 * Clears the canvas completely
 * @param  canvas         The Canvas context object to render to
 * @param  width          The width of the canvas
 * @param  height         The height of the canvas
 */
export function clearVirtualCanvas(canvas: HTMLCanvasElement | null | undefined, width: number, height: number) {
    // If the canvas isn't ready don't do anything
    if (!canvas) {
        // istanbul ignore next
        return;
    }

    // Ensure we've got the contexts to draw upon
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
}
