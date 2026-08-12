import { d3 } from "../d3";

import { renderElements } from "./renderElements";

/**
 * Start a render loop for drawing on the canvas during some animations
 * @param  canvas         The canvas element
 * @param  width          The width of the canvas
 * @param  height         The height of the canvas
 * @param  exit           The D3 data update join
 * @param  update         The D3 data exit join(s) - pass an array when a plot splits its shapes
 *                        (e.g. links/nodes/labels) across multiple independently-typed joins, so
 *                        they're all cleared and redrawn together on every tick rather than
 *                        wiping each other out
 */
export async function canvasRenderLoop(
    canvas: HTMLCanvasElement | null | undefined,
    width: number,
    height: number,
    exit: d3.Transition<Element, unknown, any, unknown>,
    update: d3.Transition<Element, unknown, any, unknown> | d3.Transition<Element, unknown, any, unknown>[],
) {
    // If the canvas isn't ready don't do anything
    if (!canvas) {
        // istanbul ignore next
        return;
    }

    // Ensure we've got the contexts to draw upon
    const context = canvas.getContext("2d");
    const updates = Array.isArray(update) ? update : [update];

    const render = () => {
        context.clearRect(0, 0, width, height);
        renderElements(context, exit);
        updates.forEach((u) => renderElements(context, u));
    };

    // Create a render loop that will run until the transitions complete
    const renderLoop = d3.timer(render);

    try {
        await exit.end();
        // eslint-disable-next-line no-empty
    } catch (e) {}
    try {
        await Promise.all(updates.map((u) => u.end()));
        // eslint-disable-next-line no-empty
    } catch (e) {}

    // Run 1 final render after animations have finished
    renderLoop.stop();
    render();
}
