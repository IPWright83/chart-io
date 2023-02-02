import { canvasRenderLoop, progressiveCanvasRenderLoop } from "../../hoc/canvas";
import { PROGRESSIVE_RENDER_THRESHOLD } from "../../constants";

/**
 * Renders to a canvas if one is provided
 * @param  canvas                  The HTML canvas (or null if we're not rendering to one)
 * @param  renderVirtualCanvas     Should a virtual canvas for events be rendered?
 * @param  width                   The width of the chart
 * @param  height                  The height of the chart
 * @param  exit                    The exit selection
 * @param  update                  The update selection
 * @return                         A promise that resolves once the rendering has completed
 */
export async function renderCanvas(
    canvas: HTMLCanvasElement | null | undefined,
    renderVirtualCanvas: any,
    width: number,
    height: number,
    update: d3.Transition<Element, unknown, any, unknown>,
    exit?: d3.Transition<Element, unknown, any, unknown>
) {
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
}
