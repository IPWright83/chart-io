import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { DendrogramPlot } from "./DendrogramPlot";

expect.extend({ toMatchImageSnapshot });

import { createMockStore, getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("DendrogramPlot", () => {
    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 5 },
        { region: "South", product: "Widgets", sales: 10 },
    ];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <DendrogramPlot categories={["region", "product"]} value="sales" />,
                data,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render a node and label for every level, and a link for every parent-child pair", async () => {
            const { container } = await renderChart({
                children: <DendrogramPlot categories={["region", "product"]} value="sales" />,
                data,
            });

            await wait();

            // 2 regions + 3 products = 5 nodes, connected by 5 links (2 region->product for North's
            // children, 1 for South's, plus 2 root->region links)
            expect(container.querySelectorAll("circle.dendrogram-node").length).toBe(5);
            expect(container.querySelectorAll("text.dendrogram-label").length).toBe(5);
            expect(container.querySelectorAll("path.dendrogram-link").length).toBe(5);
        });

        it("should hide labels when labels is false", async () => {
            const { container } = await renderChart({
                children: <DendrogramPlot categories={["region", "product"]} value="sales" labels={false} />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("text.dendrogram-label").length).toBe(0);
        });

        describe("should handle event", () => {
            it("mouseover correctly on a node", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <DendrogramPlot categories={["region", "product"]} value="sales" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "circle.dendrogram-node", onMouseOver, { region: "North", sales: 10 });

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
                    children: <DendrogramPlot categories={["region", "product"]} value="sales" onClick={onClick} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                await testMouseClick(container, "circle.dendrogram-node:last-of-type", onClick, {
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
                    children: <DendrogramPlot categories={["region", "product"]} value="sales" />,
                    data,
                    store,
                });

                await wait();

                // The first node in DOM order is "North" (has children) - clicking it should zoom in
                const firstNode = container.querySelector("circle.dendrogram-node");
                firstNode.dispatchEvent(new MouseEvent("click", { bubbles: true }));

                expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: ["North"] }));
            });

            it("should not zoom when clicking a leaf node", async () => {
                const store = createMockStore({
                    chart: { zoomable: true, animationDuration: 0, dimensions: { width: 200, height: 200 }, data },
                });
                store.dispatch = jest.fn();

                const { container } = await renderChart({
                    children: <DendrogramPlot categories={["region", "product"]} value="sales" />,
                    data,
                    store,
                });

                await wait();

                // The last node in DOM order is a leaf (South/Widgets) - clicking it shouldn't zoom
                const leafNode = container.querySelector("circle.dendrogram-node:last-of-type");
                leafNode.dispatchEvent(new MouseEvent("click", { bubbles: true }));

                expect(store.dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: expect.stringContaining("Zoom") }));
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <DendrogramPlot categories={["region", "product"]} value="sales" useCanvas={true} />
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

        it("should handle a mouseover on a node", async () => {
            const onMouseOver = jest.fn();

            const { container, store } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <DendrogramPlot categories={["region", "product"]} value="sales" onMouseOver={onMouseOver} useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            jest.spyOn(store, "dispatch");
            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            // The North region node sits at (60, 60) - the depth-1 x-position given an 80px label
            // reserve on the 200px-wide plot, and the vertical midpoint of its 2 leaf children
            await testMouseOver(container, ".virtual-canvas", onMouseOver, { region: "North", sales: 10 }, {
                bubbles: true,
                pageX: 60,
                pageY: 60,
            });
        });
    });
});
