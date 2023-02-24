import type { IColorToDataMap } from "./types";
import { renderVirtualElements } from "./renderVirtualElements";
import type { Transition } from "d3-transition";

/**
 * Renders the canvas elements based on the join
 * @param  canvas         The Canvas context object to render to
 * @param  width          The width of the canvas
 * @param  height         The height of the canvas
 * @param  update         The D3 data join update object
 */
export async function renderVirtualCanvas(
    canvas: HTMLCanvasElement | null | undefined,
    width: number,
    height: number,
    update: Transition<Element, unknown, any, unknown>[]
): Promise<IColorToDataMap> {
    // If the canvas isn't ready don't do anything
    if (!canvas) {
        // istanbul ignore next
        return;
    }

    // Ensure we've got the contexts to draw upon
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    // Used a manual index, as the `i` parameter for `.each` resets
    // when dealing with a nested selection. Start at 1 to avoid choosing black
    let index = 1;
    let lookup = {};

    for (let i = 0; i < update.length; i++) {
        const selection = update[i].selection as unknown as Transition<Element, unknown, any, unknown>;

        const results = await renderVirtualElements(context, selection, index);
        lookup = { ...lookup, ...results.colorToData };
        index = results.index;
    }

    // Return a keyed lookup object from color -> datum
    return lookup;
}
