import { renderVirtualElements } from "./renderVirtualElements";

/**
 * Renders the canvas elements based on the join
 * @param  {HTMLElement} canvas         The Canvas context object to render to
 * @param  {Number}      width          The width of the canvas
 * @param  {Number}      height         The height of the canvas
 * @param  {Object}      update         The D3 data join update object
 */
const renderVirtualCanvas = async (canvas, width, height, update) => {
    // If the canvas isn't ready don't do anything
    if (!canvas) {
        return;
    }

    // Ensure we've got the contexts to draw upon
    const context = canvas.getContext("2d");

    let lookup = {};
    for (let i = 0; i < update.length; i++) {
        const results = await renderVirtualElements(context, update[i], true);
        lookup = { ...lookup, ...results };
    }

    // Return a keyed lookup object from color -> datum
    return lookup;
};

export { renderVirtualCanvas };
