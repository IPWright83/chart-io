import * as d3 from "d3";
import React from "react";
import { fireEvent } from "@testing-library/react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VirtualCanvas, VIRTUAL_CANVAS_DEBOUNCE } from "../../../VirtualCanvas";
import { Area } from "./Area";
import { Background, MOUSE_MOVE_DEBOUNCE } from "../../../Background";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, wait, renderChart, testMouseClick, testMouseOver, testMouseExit } from "../../../../testUtils";

describe("Area", () => {
    const expectedDatum = {
        y: 5,
        x: 1,
    };

    const data = [
        { y: 0, x: 0 },
        { y: 5, x: 1 },
        { y: 10, x: 2 },
    ];

    const scales = {
        y: d3.scaleLinear().domain([0, 20]).range([100, 0]),
        x: d3.scaleLinear().domain([0, 5]).range([0, 100]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <Area x="x" y="y" />,
                data,
                scales,
            });

            await wait(200);

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Area x="x" y="y" />,
                    data,
                    scales: { y: scales.y },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Area x="x" y="y" />,
                    data,
                    scales: { x: scales.x },
                });

                expect(asFragment()).toMatchSnapshot();
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <Area x="x" y="y" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();

            const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
            expect(virtualCanvasBuffer).toMatchImageSnapshot();
        });
    });
});
