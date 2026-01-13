import * as d3 from "d3";

import { renderElements } from "./renderElements";

/**
 * Start a render loop for drawing on the canvas during some animations
 * @param  {HTMLElement} canvas    The canvas element
 * @param  {Number} width          The width of the canvas
 * @param  {Number} height         The height of the canvas
 * @param  {Object} exit           The D3 data update join
 * @param  {Object} update         The D3 data exit join
 */
const progressiveCanvasRenderLoop = async (canvas, width, height, exit, update) => {
    // If the canvas isn't ready don't do anything
    if (!canvas) {
        return;
    }

    // Ensure we've got the contexts to draw upon
    const context = canvas.getContext("2d");

    // Wait for the transitions to complete. These should be
    // set to have a duration of 0 so should complete after
    // the next async tick
    try {
        await update.end();
        // eslint-disable-next-line no-empty
    } catch (e) {}

    context.clearRect(0, 0, width, height);

    const nodes = update.nodes();

    const timer = d3.timer(() => {
        // Cancel the render loop
        if (nodes.length === 0) {
            timer.stop();
            return;
        }

        // Grab the next batch of nodes and render them
        const batch = nodes.splice(0, 1000);
        batch.each = batch.forEach;

        renderElements(context, batch);
    });
};

export { progressiveCanvasRenderLoop };
