import { scaleBand, scaleLinear } from "@chart-it/d3";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { Columns } from "./Columns";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, renderChart, wait } from "../../../testUtils";

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
        describe("throws error", () => {
            beforeEach(() => {
                jest.spyOn(console, "error").mockImplementation(() => jest.fn());
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it("when neither stacked nor grouped", async () => {
                await expect(
                    renderChart({
                        children: <Columns x="x" ys={["y", "y2"]} />,
                        data,
                        scales,
                    })
                ).rejects.toThrow("Multiple column plots must be either stacked or grouped");
            });

            it("when stacked and grouped", async () => {
                await expect(
                    renderChart({
                        children: <Columns x="x" ys={["y", "y2"]} stacked grouped />,
                        data,
                        scales,
                    })
                ).rejects.toThrow("Column plots currently do not support both being stacked and grouped");
            });
        });

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
