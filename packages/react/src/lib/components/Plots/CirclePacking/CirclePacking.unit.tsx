import { buildHierarchy as defaultBuildHierarchy } from "@chart-io/core";

import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { CirclePacking } from "./CirclePacking";

expect.extend({ toMatchImageSnapshot });

import { createMockStore, getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("CirclePacking", () => {
    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 5 },
        { region: "South", product: "Widgets", sales: 10 },
    ];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <CirclePacking categories={["region", "product"]} value="sales" />,
                data,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render a circle for every node, both groups and leaves", async () => {
            const { container } = await renderChart({
                children: <CirclePacking categories={["region", "product"]} value="sales" />,
                data,
            });

            await wait();

            // 2 region groups + 3 product leaves = 5 nodes
            expect(container.querySelectorAll("circle.circle-packing-node").length).toBe(5);
        });

        it("should hide labels when labels is false", async () => {
            const { container } = await renderChart({
                children: <CirclePacking categories={["region", "product"]} value="sales" labels={false} />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("text.circle-packing-label").length).toBe(0);
        });

        it("should use a custom buildHierarchy function when provided", async () => {
            const customBuildHierarchy = jest.fn(defaultBuildHierarchy);

            const { container } = await renderChart({
                children: (
                    <CirclePacking categories={["region", "product"]} value="sales" buildHierarchy={customBuildHierarchy} />
                ),
                data,
            });

            await wait();

            expect(customBuildHierarchy).toHaveBeenCalledWith(data, ["region", "product"], "sales", false, "CirclePacking");
            expect(container.querySelectorAll("circle.circle-packing-node").length).toBe(5);
        });

        describe("should handle event", () => {
            it("mouseover correctly on a node", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <CirclePacking categories={["region", "product"]} value="sales" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "circle.circle-packing-node", onMouseOver, { region: "North", sales: 10 });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);
                expect(dispatchCalls).toEqual(
                    expect.arrayContaining([
                        "chart/addLegendItem",
                        "event/setTooltipBorderColor",
                        "event/addTooltipItem",
                        "event/setPositionEvent",
                    ]),
                );
            });

            it("click correctly on a leaf node", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: <CirclePacking categories={["region", "product"]} value="sales" onClick={onClick} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                await testMouseClick(container, "circle.circle-packing-node:last-of-type", onClick, {
                    region: "South",
                    product: "Widgets",
                    sales: 10,
                });
            });
        });

        describe("zooming", () => {
            it("should zoom in when clicking a node with children", async () => {
                const store = createMockStore({
                    chart: { zoomable: true, animationDuration: 0, dimensions: { width: 200, height: 200 }, data },
                });
                store.dispatch = jest.fn();

                const { container } = await renderChart({
                    children: <CirclePacking categories={["region", "product"]} value="sales" />,
                    data,
                    store,
                });

                await wait();

                // The first node in DOM order is "North" (has children) - clicking it should zoom in
                const firstNode = container.querySelector("circle.circle-packing-node");
                firstNode.dispatchEvent(new MouseEvent("click", { bubbles: true }));

                expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: ["North"] }));
            });

            it("should not zoom when clicking a leaf node", async () => {
                const store = createMockStore({
                    chart: { zoomable: true, animationDuration: 0, dimensions: { width: 200, height: 200 }, data },
                });
                store.dispatch = jest.fn();

                const { container } = await renderChart({
                    children: <CirclePacking categories={["region", "product"]} value="sales" />,
                    data,
                    store,
                });

                await wait();

                // The last node in DOM order is a leaf (South/Widgets) - clicking it shouldn't zoom
                const leafNode = container.querySelector("circle.circle-packing-node:last-of-type");
                leafNode.dispatchEvent(new MouseEvent("click", { bubbles: true }));

                expect(store.dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: expect.stringContaining("Zoom") }));
            });

            it("should lay out real (non-NaN) positions for a node's subtree once zoomed in", async () => {
                const store = createMockStore({
                    chart: {
                        zoomable: true,
                        zoom: { path: ["North"] },
                        animationDuration: 0,
                        dimensions: { width: 200, height: 200 },
                        data,
                    },
                });

                const { container } = await renderChart({
                    children: <CirclePacking categories={["region", "product"]} value="sales" />,
                    data,
                    store,
                });

                await wait();

                const circles = Array.from(container.querySelectorAll("circle.circle-packing-node"));
                expect(circles.length).toBeGreaterThan(0);

                for (const circle of circles) {
                    expect(Number(circle.getAttribute("cx"))).not.toBeNaN();
                    expect(Number(circle.getAttribute("cy"))).not.toBeNaN();
                    expect(Number(circle.getAttribute("r"))).toBeGreaterThan(0);
                }
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <CirclePacking categories={["region", "product"]} value="sales" useCanvas={true} />
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
    });
});
