import * as d3 from "d3";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VirtualCanvas, VIRTUAL_CANVAS_DEBOUNCE } from "../../VirtualCanvas";
import { Areas } from "./Areas";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, wait, renderChart } from "../../../testUtils";

describe("Areas", () => {
    const data = [
        { y: 0, x: 0 },
        { y: 5, x: 1 },
        { y: 10, x: 2 },
    ];

    const scales = {
        y: d3.scaleLinear().domain([0, 20]).range([100, 0]),
        x: d3.scaleLinear().domain([0, 5]).range([0, 100]),
    };

    describe("Multiple Series", () => {
        describe("using SVG", () => {
            it("should render correctly", async () => {
                const { asFragment } = await renderChart({
                    children: <Areas x="x" ys={["y", "y2"]} />,
                    data,
                    scales,
                });

                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe("using Canvas", () => {
            it("should render correctly", async () => {
                const { container } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <Areas x="x" ys={["y", "y2"]} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvases = container.querySelectorAll(".canvas");
                expect(canvases.length).toBe(2);

                const canvasBuffer1 = getBuffer(canvases[0]);
                expect(canvasBuffer1).toMatchImageSnapshot();

                const canvasBuffer2 = getBuffer(canvases[1]);
                expect(canvasBuffer2).toMatchImageSnapshot();

                const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
                expect(virtualCanvasBuffer).toMatchImageSnapshot();
            });
        });
    });

    describe("Stacked", () => {
        describe("using SVG", () => {
            it("should render correctly", async () => {
                const { asFragment } = await renderChart({
                    children: <Areas x="x" ys={["y", "y2"]} stacked />,
                    data,
                    scales,
                });

                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe("using Canvas", () => {
            it("should render correctly", async () => {
                const { container } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <Areas x="x" ys={["y", "y2"]} useCanvas={true} stacked />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvases = container.querySelectorAll(".canvas");
                expect(canvases.length).toBe(1);

                const canvasBuffer1 = getBuffer(canvases[0]);
                expect(canvasBuffer1).toMatchImageSnapshot();

                const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
                expect(virtualCanvasBuffer).toMatchImageSnapshot();
            });
        });
    });
});
