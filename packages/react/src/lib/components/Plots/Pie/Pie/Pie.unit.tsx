import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";
import { Pie } from "./Pie";

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

describe("Pie", () => {
    const expectedDatum = {
        category: "A",
        value: 5,
    };

    const data = [
        { category: "A", value: 5 },
        { category: "B", value: 10 },
    ];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <Pie x="category" y="value" />,
                data,
            });

            // Wait for the enter transition to settle so the snapshot deterministically
            // captures the final arc geometry rather than a mid-animation frame
            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should always have a zero innerRadius, even if forced", async () => {
            // Pie deliberately doesn't expose innerRadius - a Pie segment always reaches the
            // center - but verify that an innerRadius can't leak through some other way
            const { container } = await renderChart({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                children: <Pie x="category" y="value" {...({ innerRadius: 0.6 } as any)} />,
                data,
            });

            await wait();
            const slice = container.querySelector("path.pie-slice");
            expect(slice.getAttribute("data-inner-radius")).toBe("0");
        });

        describe("should handle event", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <Pie x="category" y="value" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");
                testMouseOver(container, "path.pie-slice", onMouseOver, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: <Pie x="category" y="value" onMouseOut={onMouseOut} />,
                    data,
                });

                jest.spyOn(store, "dispatch");
                testMouseExit(container, "path.pie-slice", onMouseOut, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    // Mouseover
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    // Mouseexit
                    "event/setTooltipBorderColor",
                    "event/removeTooltipItem",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: <Pie x="category" y="value" onClick={onClick} />,
                    data,
                });

                jest.spyOn(store, "dispatch");
                testMouseClick(container, "path.pie-slice", onClick, expectedDatum);
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <Pie x="category" y="value" useCanvas={true} />
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
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <Pie x="category" y="value" onMouseOver={onMouseOver} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseOver(container, ".virtual-canvas", onMouseOver, expectedDatum, {
                    bubbles: true,
                    pageX: 150,
                    pageY: 100,
                });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/mouseMove",
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <Pie x="category" y="value" onClick={onClick} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseClick(container, ".virtual-canvas", onClick, expectedDatum, {
                    bubbles: true,
                    pageX: 150,
                    pageY: 100,
                });
            });
        });
    });
});
