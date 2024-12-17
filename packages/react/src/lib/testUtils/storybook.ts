import { expect, fireEvent } from "@storybook/test";

import { wait } from "./wait";

interface IMouseCoords {
    clientX: number;
    clientY: number;
}

export interface ITestArgs {
    canvasElement: HTMLElement;
    args: {
        onMouseOver: (event: MouseEvent) => void;
        onMouseOut: (event: MouseEvent) => void;
        onClick: (event: MouseEvent) => void;
    };
}

const STORYBOOK_PLAY_DELAY = 800;

/**
 * Creates an interaction test for an SVG chart
 * @param selector  The CSS selector to use to grab an data point
 * @param event     An object containing the mouse coordinates
 * @returns         The Storybook play function
 */
export const createSVGTest =
    (selector: string, event: IMouseCoords) =>
        /**
         * The actual test
         * @param { canvasElement, args } The storybook play function interface
         */
        async ({ canvasElement, args }: ITestArgs) => {
            const eventArgs = { ...event, bubbles: true };

            // Wait for the chart to finish rendering
            await wait(STORYBOOK_PLAY_DELAY);

            // Grab a point
            const dataPoint = canvasElement.querySelector(selector);
            expect(dataPoint).toBeDefined();

            fireEvent(dataPoint, new MouseEvent("mouseover", eventArgs));
            expect(args.onMouseOver).toHaveBeenCalled();

            fireEvent(dataPoint, new MouseEvent("click", eventArgs));
            expect(args.onClick).toHaveBeenCalled();

            fireEvent(dataPoint, new MouseEvent("mouseout", eventArgs));
            expect(args.onMouseOut).toHaveBeenCalled();

            // Add the tooltip back to verify it
            fireEvent(dataPoint, new MouseEvent("mouseover", eventArgs));
            expect(args.onMouseOver).toHaveBeenCalled();
        };

/**
 * Creats an interaction test for the EventReciever in an SVG chart
 * @param event             An object containing the mouse coordinates
 * @param postAssertions    A function to run extra assertions after the mouse events have fired
 * @returns                 The Storybook play function
 */
export const createEventReceiverTest =
    (event: IMouseCoords, postAssertions?: (canvasElement: HTMLElement) => void) =>
        async ({ canvasElement }: { canvasElement: HTMLElement }) => {
            const eventArgs = { ...event, bubbles: true };

            // Wait for the chart to finish rendering
            await wait(STORYBOOK_PLAY_DELAY);

            // Find the event reciver
            const eventReciver = canvasElement.querySelector(".event-receiver");
            expect(eventReciver).toBeDefined();

            fireEvent(eventReciver, new MouseEvent("mouseover", eventArgs));
            await wait(50);

            if (postAssertions) {
                postAssertions(canvasElement);
            }
        };

/**
 * Creates an interaction test for a Canvas chart
 * @param event     An object containing the mouse coordinates
 * @returns         The Storybook play function
 */
export const createCanvasTest =
    (event: IMouseCoords) =>
        /**
         * The actual test
         * @param { canvasElement, args } The storybook play function interface
         */
        async ({ canvasElement, args }: ITestArgs) => {
            const eventArgs = { ...event, bubbles: true };

            // Wait for the chart to finish rendering
            await wait(STORYBOOK_PLAY_DELAY);

            // Grab the virtual canvas
            const virtualCanvas = canvasElement.querySelector(".virtual-canvas");
            expect(virtualCanvas).toBeDefined();

            fireEvent(virtualCanvas, new MouseEvent("mousemove", eventArgs));
            expect(args.onMouseOver).toHaveBeenCalled();
            await wait(50);

            fireEvent(virtualCanvas, new MouseEvent("click", eventArgs));
            expect(args.onClick).toHaveBeenCalled();
            await wait(50);

            fireEvent(virtualCanvas, new MouseEvent("mousemove", { clientX: 0, clientY: 0, bubbles: true }));
            expect(args.onMouseOut).toHaveBeenCalled();
            await wait(50);

            // Add the tooltip back to verify it
            fireEvent(virtualCanvas, new MouseEvent("mousemove", eventArgs));
        };
