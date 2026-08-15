import { canvasRenderLoop, d3, PROGRESSIVE_RENDER_THRESHOLD, progressiveCanvasRenderLoop, renderElements } from "@chart-io/core";

import type React from "react";

/**
 * Renders to a canvas if one is provided
 * @param  canvas                  The HTML canvas (or null if we're not rendering to one)
 * @param  renderVirtualCanvas     Should a virtual canvas for events be rendered?
 * @param  width                   The width of the chart
 * @param  height                  The height of the chart
 * @param  update                  The update selection
 * @param  exit                    The exit selection
 * @return                         A promise that resolves once the rendering has completed
 */
export async function renderCanvas(
    canvas: HTMLCanvasElement | null | undefined,
    renderVirtualCanvas: any,
    width: number,
    height: number,
    update: d3.Transition<Element, unknown, any, unknown>,
    exit?: d3.Transition<Element, unknown, any, unknown>,
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

/**
 * Repaints a Canvas from the current state of its (detached) layer, e.g. after a hover/focus change has
 * updated a node's style (such as opacity) directly via D3. Canvas is just a bitmap, so unlike SVG,
 * mutating a node's style has no visual effect until something explicitly repaints it
 * @param  canvas     The HTML canvas to redraw (a no-op if this plot isn't rendering to one)
 * @param  width      The width of the chart
 * @param  height     The height of the chart
 * @param  layer      The (detached) layer holding the nodes to redraw
 */
export function redrawCanvas(
    canvas: HTMLCanvasElement | null | undefined,
    width: number,
    height: number,
    layer: React.MutableRefObject<Element>,
) {
    if (!canvas || !layer?.current) {
        return;
    }

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    // renderElements() only ever calls .each() on what it's given, so a plain selection works
    // fine here too, despite the narrower `Transition` typing it shares with canvasRenderLoop()
    const elements = d3.select(layer.current).selectAll<Element, unknown>("*") as unknown as d3.Transition<
        Element,
        unknown,
        any,
        unknown
    >;
    renderElements(context, elements);
}
