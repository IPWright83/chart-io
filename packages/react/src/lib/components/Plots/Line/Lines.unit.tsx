import React from "react";
import { scaleLinear } from "@d3-chart/d3";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { Lines } from "./Lines";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, renderChart, wait } from "../../../testUtils";

describe("Lines", () => {
    const data = [
        { y2: 5, y: 0, x: 0 },
        { y2: 10, y: 5, x: 1 },
        { y2: 0, y: 10, x: 2 },
    ];

    const scales = {
        y: scaleLinear().domain([0, 20]).range([100, 0]),
        y2: scaleLinear().domain([0, 20]).range([100, 0]),
        x: scaleLinear().domain([0, 5]).range([0, 100]),
    };

    describe("Multiple Series", () => {
        describe("using SVG", () => {
            it("should render correctly", async () => {
                const { asFragment } = await renderChart({
                    children: <Lines x="x" ys={["y", "y2"]} />,
                    data,
                    scales,
                });

                // Wait for the second render of the line, as
                // first render we put in a placeholder to animate
                await wait(10);

                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe("using Canvas", () => {
            it("should render correctly", async () => {
                const { container } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <Lines x="x" ys={["y", "y2"]} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                // Wait for the second render of the line, as
                // first render we put in a placeholder to animate
                await wait(10);

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvases = container.querySelectorAll(".canvas");
                expect(canvases.length).toBe(2);

                const canvasBuffer1 = getBuffer(canvases[0] as HTMLCanvasElement);
                expect(canvasBuffer1).toMatchImageSnapshot();

                const canvasBuffer2 = getBuffer(canvases[1] as HTMLCanvasElement);
                expect(canvasBuffer2).toMatchImageSnapshot();

                // const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
                // expect(virtualCanvasBuffer).toMatchImageSnapshot();
            });
        });
    });
});
