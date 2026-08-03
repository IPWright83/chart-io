import { d3 } from "@chart-io/core";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { RadialAreas } from "./RadialAreas";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, renderChart, wait } from "../../../testUtils";

describe("RadialAreas", () => {
    const data = [
        { day: 0, low: 10, high: 30 },
        { day: 1, low: 40, high: 60 },
        { day: 2, low: 20, high: 80 },
        { day: 3, low: 15, high: 50 },
    ];

    const scales = {
        day: d3.scaleLinear().domain([0, 3]).range([0, 2 * Math.PI]),
        low: d3.scaleLinear().domain([0, 100]).range([0, 100]),
        high: d3.scaleLinear().domain([0, 100]).range([0, 100]),
    };

    describe("using SVG", () => {
        it("should render one path per field in ys", async () => {
            const { container } = await renderChart({
                children: <RadialAreas x="day" ys={["low", "high"]} />,
                data,
                scales,
            });

            await wait(10);
            expect(container.querySelectorAll("path.radial-area").length).toBe(2);
        });

        it("should assign each series a different color from the palette", async () => {
            const { asFragment } = await renderChart({
                children: <RadialAreas x="day" ys={["low", "high"]} />,
                data,
                scales,
            });

            // Wait for the second render of the area, as the first render is a placeholder to animate from
            await wait(100);
            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe("using Canvas", () => {
        it("should render one canvas per field in ys", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <RadialAreas x="day" ys={["low", "high"]} useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            await wait(10);
            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvases = container.querySelectorAll(".canvas");
            expect(canvases.length).toBe(2);

            expect(getBuffer(canvases[0] as HTMLCanvasElement)).toMatchImageSnapshot();
            expect(getBuffer(canvases[1] as HTMLCanvasElement)).toMatchImageSnapshot();
        });
    });
});
