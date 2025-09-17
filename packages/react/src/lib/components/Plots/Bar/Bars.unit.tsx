import { d3 } from "@chart-io/core";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { Bars } from "./Bars";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, renderChart, wait } from "../../../testUtils";

describe("Bars", () => {
    const data = [
        { y: "A", x: 5, x2: 8 },
        { y: "B", x: 10, x2: 12 },
    ];
    const scales = {
        y: d3.scaleBand().domain(["A", "B"]).range([0, 100]),
        x: d3.scaleLinear().domain([0, 30]).range([0, 100]),
        x2: d3.scaleLinear().domain([0, 30]).range([0, 100]),
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
                        children: <Bars y="y" xs={["x", "x2"]} />,
                        data,
                        scales,
                    })
                ).rejects.toThrow("Multiple Bar plots must be either stacked or grouped");
            });

            it("when stacked and grouped", async () => {
                await expect(
                    renderChart({
                        children: <Bars y="y" xs={["x", "x2"]} stacked grouped />,
                        data,
                        scales,
                    })
                ).rejects.toThrow("Bar plots do not support both being stacked and grouped");
            });
        });

        describe("using SVG", () => {
            it("should render correctly", async () => {
                const { asFragment } = await renderChart({
                    children: <Bars y="y" xs={["x", "x2"]} stacked />,
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
                            <Bars y="y" xs={["x", "x2"]} useCanvas={true} stacked />
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
                    children: <Bars y="y" xs={["x", "x2"]} grouped />,
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
                            <Bars y="y" xs={["x", "x2"]} useCanvas={true} grouped />
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
