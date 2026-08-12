import { canvasRenderLoop, d3, PROGRESSIVE_RENDER_THRESHOLD, progressiveCanvasRenderLoop } from "@chart-io/core";

/**
 * Renders to a canvas if one is provided
 * @param  canvas                  The HTML canvas (or null if we're not rendering to one)
 * @param  renderVirtualCanvas     Should a virtual canvas for events be rendered?
 * @param  width                   The width of the chart
 * @param  height                  The height of the chart
 * @param  update                  The update selection. Pass an array when a plot splits its
 *                                 shapes across multiple independently-typed joins (e.g. a
 *                                 Dendrogram's links/nodes/labels) - they're cleared and redrawn
 *                                 together on every tick rather than wiping each other out
 * @param  exit                    The exit selection
 * @return                         A promise that resolves once the rendering has completed
 */
export async function renderCanvas(
    canvas: HTMLCanvasElement | null | undefined,
    renderVirtualCanvas: any,
    width: number,
    height: number,
    update: d3.Transition<Element, unknown, any, unknown> | d3.Transition<Element, unknown, any, unknown>[],
    exit?: d3.Transition<Element, unknown, any, unknown>,
) {
    if (!canvas) {
        return;
    }

    const updates = Array.isArray(update) ? update : [update];
    const totalSize = updates.reduce((size, u) => size + u.size(), 0);

    // If the dataset is large then we'll progressively render it. This means we're going
    // to render it in batches, to keep the browser performant, at the expense of supporting events
    if (totalSize > PROGRESSIVE_RENDER_THRESHOLD) {
        return await progressiveCanvasRenderLoop(canvas, width, height, exit, updates);
    }

    // Render to the plots canvas
    await canvasRenderLoop(canvas, width, height, exit, updates);

    // If a virtual canvas is being used for events, render each join to it - they're accumulated
    // and rendered together, so this doesn't suffer the same clear-on-every-call problem as the
    // real canvas above
    if (renderVirtualCanvas) {
        updates.forEach((u) => renderVirtualCanvas(u));
    }
}
