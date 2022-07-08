import * as d3 from "d3";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VirtualCanvas, VIRTUAL_CANVAS_DEBOUNCE } from "../../VirtualCanvas";
import { Scatters } from "./Scatters";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, wait, renderChart } from "../../../testUtils";

describe("Scatters", () => {
    const data = [
        { x: 5, y: 5, y2: 8 },
        { x: 10, y: 10, y2: 12 },
    ];
    const scales = {
        x: d3.scaleLinear().domain([0, 20]).range([0, 100]),
        y: d3.scaleLinear().domain([0, 20]).range([0, 100]),
        y2: d3.scaleLinear().domain([0, 20]).range([0, 100]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <Scatters x="x" ys={["y", "y2"]} />,
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
                        <Scatters x="x" ys={["y", "y2"]} useCanvas={true} />
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
