/**
 * Clears the canvas completely
 * @param  {HTMLElement} canvas         The Canvas context object to render to
 * @param  {Number}      width          The width of the canvas
 * @param  {Number}      height         The height of the canvas
 */
const clearVirtualCanvas = async (canvas, width, height) => {
    // If the canvas isn't ready don't do anything
    if (!canvas) {
        return;
    }

    // Ensure we've got the contexts to draw upon
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
};

export { clearVirtualCanvas };
