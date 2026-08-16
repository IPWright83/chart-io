import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { FunnelPlot } from "./FunnelPlot";

expect.extend({ toMatchImageSnapshot });

import {
    actionsIncludes,
    getBuffer,
    renderChart,
    testMouseClick,
    testMouseExit,
    testMouseOver,
    wait,
} from "../../../testUtils";

describe("FunnelPlot", () => {
    const expectedDatum = {
        stage: "Visitors",
        count: 1000,
    };

    const data = [
        { stage: "Visitors", count: 1000 },
        { stage: "Leads", count: 500 },
        { stage: "Customers", count: 100 },
    ];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <FunnelPlot category="stage" value="count" />,
                data,
            });

            // Wait for the enter transition to settle so the snapshot deterministically
            // captures the final segment geometry rather than a mid-animation frame
            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render one segment per row", async () => {
            const { container } = await renderChart({
                children: <FunnelPlot category="stage" value="count" />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("polygon.funnel-segment").length).toBe(3);
        });

        it("should render inverted (Pyramid) correctly", async () => {
            const { asFragment } = await renderChart({
                children: <FunnelPlot category="stage" value="count" inverted={true} />,
                data,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should order segments by value (descending) when sort is set", async () => {
            const unsorted = [
                { stage: "Leads", count: 500 },
                { stage: "Visitors", count: 1000 },
                { stage: "Customers", count: 100 },
            ];

            const { container } = await renderChart({
                children: <FunnelPlot category="stage" value="count" sort={true} />,
                data: unsorted,
            });

            await wait();

            const segments = Array.from(container.querySelectorAll("polygon.funnel-segment"));
            const topWidthOf = (points: string) => {
                const [topLeft, topRight] = points.trim().split(/\s+/);
                return Number(topRight.split(",")[0]) - Number(topLeft.split(",")[0]);
            };
            const topWidths = segments.map((segment) => topWidthOf(segment.getAttribute("points")));

            expect(topWidths[0]).toBeGreaterThan(topWidths[1]);
            expect(topWidths[1]).toBeGreaterThan(topWidths[2]);
        });

        describe("should handle event", () => {
            it("mouseover correctly on a segment", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <FunnelPlot category="stage" value="count" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "polygon.funnel-segment", onMouseOver, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual(
                    expect.arrayContaining([
                        "event/setTooltipBorderColor",
                        "event/addTooltipItem",
                        "event/setPositionEvent",
                    ]),
                );
            });

            it("click correctly on a segment", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: <FunnelPlot category="stage" value="count" onClick={onClick} />,
                    data,
                });

                await testMouseClick(container, "polygon.funnel-segment", onClick, expectedDatum);
            });

            it("should not trigger events when interactive is false", async () => {
                const onMouseOver = jest.fn();
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: (
                        <FunnelPlot
                            category="stage"
                            value="count"
                            interactive={false}
                            onMouseOver={onMouseOver}
                            onClick={onClick}
                        />
                    ),
                    data,
                });

                await wait();

                const segment = container.querySelector("polygon.funnel-segment");
                segment.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
                segment.dispatchEvent(new MouseEvent("click", { bubbles: true }));

                expect(onMouseOver).not.toHaveBeenCalled();
                expect(onClick).not.toHaveBeenCalled();
            });
        });

        it("should warn when category values aren't unique", async () => {
            const duplicateData = [
                { stage: "Visitors", count: 1000 },
                { stage: "Visitors", count: 500 },
            ];

            jest.spyOn(console, "warn").mockImplementation(() => undefined);

            await renderChart({
                children: <FunnelPlot category="stage" value="count" />,
                data: duplicateData,
            });

            await wait();

            expect(console.warn).toHaveBeenCalled();

            (console.warn as jest.Mock).mockRestore();
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <FunnelPlot category="stage" value="count" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();

            const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
            expect(virtualCanvasBuffer).toMatchImageSnapshot();
        });

        describe("should handle event", () => {
            // (100, 30) sits inside the Visitors segment's top-left-widest trapezoid (see the "using
            // SVG should render correctly" snapshot for its exact points); (195, 195) sits outside
            // every segment, in the empty space beside the narrow Customers segment at the bottom
            const overSegment = { pageX: 100, pageY: 30, bubbles: true };
            const outsideSegment = { pageX: 195, pageY: 195, bubbles: true };

            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <FunnelPlot category="stage" value="count" onMouseOver={onMouseOver} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseOver(container, ".virtual-canvas", onMouseOver, expectedDatum, overSegment);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <FunnelPlot category="stage" value="count" onMouseOut={onMouseOut} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseExit(container, ".virtual-canvas", onMouseOut, expectedDatum, overSegment, outsideSegment);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    "event/removeTooltipItem",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <FunnelPlot category="stage" value="count" onClick={onClick} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                });

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseClick(container, ".virtual-canvas", onClick, expectedDatum, overSegment);
            });
        });
    });
});
