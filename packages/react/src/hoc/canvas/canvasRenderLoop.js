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
const canvasRenderLoop = async (canvas, width, height, exit, update) => {
    // If the canvas isn't ready don't do anything
    if (!canvas) {
        return;
    }

    // Ensure we've got the contexts to draw upon
    const context = canvas.getContext("2d");

    const render = () => {
        context.clearRect(0, 0, width, height);
        renderElements(context, exit);
        renderElements(context, update);
    };

    // Create a render loop that will run until the transitions complete
    const renderLoop = d3.timer(render);

    try {
        await exit.end();
        // eslint-disable-next-line no-empty
    } catch (e) {}
    try {
        await update.end();
        // eslint-disable-next-line no-empty
    } catch (e) {}

    // Run 1 final render after animations have finished
    renderLoop.stop();
    render();
};

export { canvasRenderLoop };
