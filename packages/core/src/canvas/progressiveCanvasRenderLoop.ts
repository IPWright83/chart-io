import { d3 } from "../d3";

import { renderElements } from "./renderElements";

/**
 * Start a render loop for drawing on the canvas during some animations
 * @param  canvas         The canvas element
 * @param  width          The width of the canvas
 * @param  height         The height of the canvas
 * @param  exit           The D3 data update join
 * @param  update         The D3 data exit join(s) - pass an array when a plot splits its shapes
 *                        (e.g. links/nodes/labels) across multiple independently-typed joins
 */
export async function progressiveCanvasRenderLoop(
    canvas: HTMLCanvasElement | null | undefined,
    width: number,
    height: number,
    exit: d3.Transition<Element, unknown, any, unknown>,
    update: d3.Transition<Element, unknown, any, unknown> | d3.Transition<Element, unknown, any, unknown>[]
) {
    // If the canvas isn't ready don't do anything
    if (!canvas) {
        return;
    }

    // Ensure we've got the contexts to draw upon
    const context = canvas.getContext("2d");
    const updates = Array.isArray(update) ? update : [update];

    // Wait for the transitions to complete. These should be
    // set to have a duration of 0 so should complete after
    // the next async tick
    try {
        await Promise.all(updates.map((u) => u.end()));
        // eslint-disable-next-line no-empty
    } catch (e) {}

    context.clearRect(0, 0, width, height);

    const nodes = updates.flatMap((u) => u.nodes());

    const renderLoop = d3.timer(() => {
        // Cancel the render loop
        if (nodes.length === 0) {
            renderLoop.stop();
            return;
        }

        // Grab the next batch of nodes and render them
        const batch = nodes.splice(0, 1000);

        // @ts-expect-error: Extending the interface on purpose
        batch.each = batch.forEach;

        // @ts-ignore: Not really sure what this means
        renderElements(context, batch);
    });
}
