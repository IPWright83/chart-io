import { d3 } from "@chart-io/core";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";
import { RadarSeries } from "./RadarSeries";

expect.extend({ toMatchImageSnapshot });

import {
    actionsIncludes,
    getBuffer,
    renderChart,
    testMouseClick,
    testMouseExit,
    testMouseOver,
    wait,
} from "../../../../testUtils";

describe("RadarSeries", () => {
    // One row per series - the whole row is what onMouseOver/onMouseOut/onClick receive, regardless
    // of which vertex was hovered
    const expectedDatum = { player: "playerA", A: 50, B: 80, C: 30, D: 60 };

    const data = [expectedDatum];

    // 4 evenly spaced categories (0, 90, 180, 270 degrees) over a 200x200 chart (cx=cy=100, maxRadius=100)
    const scales = {
        category: d3.scalePoint().domain(["A", "B", "C", "D"]).range([0, (2 * Math.PI * 3) / 4]),
        A: d3.scaleLinear().domain([0, 100]).range([0, 100]),
        B: d3.scaleLinear().domain([0, 100]).range([0, 100]),
        C: d3.scaleLinear().domain([0, 100]).range([0, 100]),
        D: d3.scaleLinear().domain([0, 100]).range([0, 100]),
    };

    const ys = ["A", "B", "C", "D"];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <RadarSeries category="category" name="player" seriesName="playerA" ys={ys} />,
                data,
                scales,
            });

            // Wait for the enter transition to settle so the snapshot deterministically
            // captures the final shape rather than a mid-animation frame
            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render unfilled when filled is false", async () => {
            const { asFragment } = await renderChart({
                children: (
                    <RadarSeries category="category" name="player" seriesName="playerA" ys={ys} filled={false} />
                ),
                data,
                scales,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should use the labeller for the tooltip name", async () => {
            const onMouseOver = jest.fn();
            const labeller = (field: string) => `Field ${field}`;

            const { container, store } = await renderChart({
                children: (
                    <RadarSeries
                        category="category"
                        name="player"
                        seriesName="playerA"
                        ys={ys}
                        labeller={labeller}
                        onMouseOver={onMouseOver}
                    />
                ),
                data,
                scales,
            });

            jest.spyOn(store, "dispatch");
            testMouseOver(container, "circle.radar-marker", onMouseOver, expectedDatum);

            const addTooltipItemCall = (store.dispatch as jest.Mock).mock.calls.find(
                (c) => c[0].type === "event/addTooltipItem",
            );
            expect(addTooltipItemCall[0].payload.name).toBe("Field A");
        });

        describe("should handle event", () => {
            it("mouseover correctly on a vertex marker", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <RadarSeries
                            category="category"
                            name="player"
                            seriesName="playerA"
                            ys={ys}
                            onMouseOver={onMouseOver}
                        />
                    ),
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                testMouseOver(container, "circle.radar-marker", onMouseOver, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container } = await renderChart({
                    children: (
                        <RadarSeries
                            category="category"
                            name="player"
                            seriesName="playerA"
                            ys={ys}
                            onMouseOut={onMouseOut}
                        />
                    ),
                    data,
                    scales,
                });

                testMouseExit(container, "circle.radar-marker", onMouseOut, expectedDatum);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: (
                        <RadarSeries category="category" name="player" seriesName="playerA" ys={ys} onClick={onClick} />
                    ),
                    data,
                    scales,
                });

                testMouseClick(container, "circle.radar-marker", onClick, expectedDatum);
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <RadarSeries category="category" name="player" seriesName="playerA" ys={ys} useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();
        });

        it("should handle a mouseover on a vertex marker", async () => {
            const onMouseOver = jest.fn();

            const { container, store } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <RadarSeries
                            category="category"
                            name="player"
                            seriesName="playerA"
                            ys={ys}
                            onMouseOver={onMouseOver}
                            useCanvas={true}
                        />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            jest.spyOn(store, "dispatch");
            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            // "A" is at angle 0 (top) with value 50, so its marker sits at (cx, cy - 50) = (100, 50)
            await testMouseOver(container, ".virtual-canvas", onMouseOver, expectedDatum, {
                bubbles: true,
                pageX: 100,
                pageY: 50,
            });
        });
    });
});
