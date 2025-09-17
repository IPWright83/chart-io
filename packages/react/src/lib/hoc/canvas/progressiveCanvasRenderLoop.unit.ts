import { d3 } from "@chart-io/core";

import { progressiveCanvasRenderLoop } from "./progressiveCanvasRenderLoop";
import { renderElements } from "./renderElements";

jest.mock("./renderElements", () => ({
    renderElements: jest.fn(),
}));

describe("progressiveCanvasRenderLoop", () => {
    // eslint-disable-next-line
    const getNodes = (count) => Array.apply(null, Array(count)).map((x, i) => i);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should do nothing when canvas is null", async () => {
        const canvas = null;
        const width = 500;
        const height = 300;
        const exit = {} as any;
        const update = { end: jest.fn() } as any;

        await progressiveCanvasRenderLoop(canvas, width, height, exit, update);

        expect(update.end).not.toHaveBeenCalled();
    });

    it("should clear canvas and call renderLoop when canvas is valid", async () => {
        const clearRect = jest.fn();
        const getContext = jest.fn(() => ({ clearRect }));
        const canvas = { getContext } as any;

        const width = 500;
        const height = 300;
        const exit = {} as any; // Replace with actual Transition<Element, unknown, any, unknown> mock
        const update = {
            nodes: jest.fn(() => getNodes(100)),
            end: jest.fn(() => Promise.resolve()),
        } as any; // Replace with actual Transition<Element, unknown, any, unknown> mock

        await progressiveCanvasRenderLoop(canvas, width, height, exit, update);
        d3.timerFlush();

        expect(update.end).toHaveBeenCalled();
        expect(getContext).toHaveBeenCalledWith("2d");
        expect(clearRect).toHaveBeenCalledWith(0, 0, width, height);
        expect(update.nodes).toHaveBeenCalled();
        expect(renderElements).toHaveBeenCalled();
    });

    it("should stop renderLoop when nodes length is 0", async () => {
        const canvas = {
            getContext: jest.fn(() => ({
                clearRect: jest.fn(),
            })),
        } as any;
        const width = 500;
        const height = 300;
        const exit = {} as any; // Replace with actual Transition<Element, unknown, any, unknown> mock
        const update = {
            nodes: jest.fn(() => getNodes(0)),
            end: jest.fn(() => Promise.resolve()),
        } as any; // Replace with actual Transition<Element, unknown, any, unknown> mock

        await progressiveCanvasRenderLoop(canvas, width, height, exit, update);
        d3.timerFlush();

        expect(renderElements).not.toHaveBeenCalled();
    });

    it("should render elements in batches", async () => {
        const canvas = {
            getContext: jest.fn(() => ({
                clearRect: jest.fn(),
            })),
        } as any;
        const width = 500;
        const height = 300;

        const exit = {} as any; // Replace with actual Transition<Element, unknown, any, unknown> mock
        const update = {
            nodes: jest.fn(() => getNodes(2000)),
            end: jest.fn(() => Promise.resolve()),
        } as any; // Replace with actual Transition<Element, unknown, any, unknown> mock

        await progressiveCanvasRenderLoop(canvas, width, height, exit, update);

        d3.timerFlush();
        d3.timerFlush();

        expect(renderElements).toHaveBeenCalledTimes(2); // Make sure renderElements was called
    });
});
