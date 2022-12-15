import { canvasRenderLoop, progressiveCanvasRenderLoop } from "../../hoc/canvas";
import { PROGRESSIVE_RENDER_THRESHOLD } from "../../constants";

/**
 * Renders to a canvas if one is provided
 * @param  {Object} options.canvas                  The HTML canvas (or null if we're not rendering to one)
 * @param  {Function} options.renderVirtualCanvas     Should a virtual canvas for events be rendered?
 * @param  {Number} options.width                   The width of the chart
 * @param  {Number} options.height                  The height of the chart
 * @param  {d3.selection} options.exit              The exit selection
 * @param  {d3.selection} options.update            The update selection
 * @return {Promise}                                A promise that resolves once the rendering has completed
 */
const renderCanvas = async ({ canvas, renderVirtualCanvas, width, height, exit, update }) => {
    if (!canvas) {
        return;
    }

    // If the dataset is large then we'll progressively render it. This means we're going
    // to render it in batches, to keep the browser performant, at the expense of supporting events
    if (update.size() > PROGRESSIVE_RENDER_THRESHOLD) {
        return await progressiveCanvasRenderLoop(canvas, width, height, exit, update);
    }

    // Render to the plots canvas
    await canvasRenderLoop(canvas, width, height, exit, update);

    // If a virtual canvas is being used for event, render that at the end
    if (renderVirtualCanvas) {
        renderVirtualCanvas(update);
    }
};

export { renderCanvas };
