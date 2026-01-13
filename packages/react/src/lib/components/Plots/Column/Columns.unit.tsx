import { scaleBand, scaleLinear } from "d3-scale";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VirtualCanvas, VIRTUAL_CANVAS_DEBOUNCE } from "../../VirtualCanvas";
import { Columns } from "./Columns";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, wait, renderChart } from "../../../testUtils";

describe("Columns", () => {
    const data = [
        { x: "A", y: 5, y2: 8 },
        { x: "B", y: 10, y2: 12 },
    ];
    const scales = {
        x: scaleBand().domain(["A", "B"]).range([0, 100]),
        y: scaleLinear().domain([0, 30]).range([100, 0]),
        y2: scaleLinear().domain([0, 30]).range([100, 0]),
    };

    describe("Stacked", () => {
        describe("using SVG", () => {
            it("should render correctly", async () => {
                const { asFragment } = await renderChart({
                    children: <Columns x="x" ys={["y", "y2"]} stacked />,
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
                            <Columns x="x" ys={["y", "y2"]} useCanvas={true} stacked />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvases = container.querySelectorAll(".canvas");
                expect(canvases.length).toBe(1);

                const canvasBuffer1 = getBuffer(canvases[0] as HTMLCanvasElement);
                expect(canvasBuffer1).toMatchImageSnapshot();

                const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
                expect(virtualCanvasBuffer).toMatchImageSnapshot();
            });
        });
    });

    describe("Grouped", () => {
        describe("using SVG", () => {
            it("should render correctly", async () => {
                const { asFragment } = await renderChart({
                    children: <Columns x="x" ys={["y", "y2"]} grouped />,
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
                            <Columns x="x" ys={["y", "y2"]} useCanvas={true} grouped />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvases = container.querySelectorAll(".canvas");
                expect(canvases.length).toBe(1);

                const canvasBuffer1 = getBuffer(canvases[0] as HTMLCanvasElement);
                expect(canvasBuffer1).toMatchImageSnapshot();

                const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
                expect(virtualCanvasBuffer).toMatchImageSnapshot();
            });
        });
    });
});
