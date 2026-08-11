import { buildHierarchy as defaultBuildHierarchy } from "@chart-io/core";

import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { TreemapPlot } from "./TreemapPlot";

expect.extend({ toMatchImageSnapshot });

import {
    actionsIncludes,
    createMockStore,
    getBuffer,
    renderChart,
    testMouseClick,
    testMouseOver,
    wait,
} from "../../../testUtils";

describe("TreemapPlot", () => {
    const expectedDatum = {
        region: "North",
        product: "Widgets",
        sales: 5,
    };

    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 5 },
        { region: "South", product: "Widgets", sales: 10 },
    ];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <TreemapPlot categories={["region", "product"]} value="sales" />,
                data,
            });

            // Wait for the enter transition to settle so the snapshot deterministically
            // captures the final cell geometry rather than a mid-animation frame
            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should only render leaf cells", async () => {
            const { container } = await renderChart({
                children: <TreemapPlot categories={["region", "product"]} value="sales" />,
                data,
            });

            await wait();

            // 3 leaf products (Widgets/Gadgets under North, Widgets under South), no group cells
            expect(container.querySelectorAll("rect.treemap-cell").length).toBe(3);
        });

        it("should render an N-level hierarchy correctly", async () => {
            const threeLevelData = [
                { region: "North", product: "Widgets", sku: "W1", sales: 5 },
                { region: "North", product: "Gadgets", sku: "G1", sales: 5 },
                { region: "South", product: "Widgets", sku: "W2", sales: 10 },
            ];

            const { asFragment } = await renderChart({
                children: <TreemapPlot categories={["region", "product", "sku"]} value="sales" />,
                data: threeLevelData,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should use a custom buildHierarchy function when provided", async () => {
            const customBuildHierarchy = jest.fn(defaultBuildHierarchy);

            const { container } = await renderChart({
                children: <TreemapPlot categories={["region", "product"]} value="sales" buildHierarchy={customBuildHierarchy} />,
                data,
            });

            await wait();

            expect(customBuildHierarchy).toHaveBeenCalledWith(data, ["region", "product"], "sales", false, "Treemap");
            expect(container.querySelectorAll("rect.treemap-cell").length).toBe(3);
        });

        describe("should handle event", () => {
            it("mouseover correctly on a leaf cell", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <TreemapPlot categories={["region", "product"]} value="sales" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "rect.treemap-cell", onMouseOver, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("click correctly on a leaf cell", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: <TreemapPlot categories={["region", "product"]} value="sales" onClick={onClick} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                await testMouseClick(container, "rect.treemap-cell:last-of-type", onClick, {
                    region: "South",
                    product: "Widgets",
                    sales: 10,
                });
            });
        });

        describe("zooming", () => {
            it("should zoom in to a leaf's immediate parent when it isn't already focused", async () => {
                const store = createMockStore({
                    chart: { zoomable: true, animationDuration: 0, dimensions: { width: 200, height: 200 }, data },
                });
                store.dispatch = jest.fn();

                const { container } = await renderChart({
                    children: <TreemapPlot categories={["region", "product"]} value="sales" zoomable={true} />,
                    data,
                    store,
                });

                await wait();

                const firstCell = container.querySelector("rect.treemap-cell");
                firstCell.dispatchEvent(new MouseEvent("click", { bubbles: true }));

                expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: ["North"] }));
            });

            it("should zoom back out when clicking a leaf whose parent is already focused", async () => {
                const store = createMockStore({
                    chart: {
                        zoomable: true,
                        zoom: { path: ["North"] },
                        animationDuration: 0,
                        dimensions: { width: 200, height: 200 },
                        data,
                    },
                });
                store.dispatch = jest.fn();

                const { container } = await renderChart({
                    children: <TreemapPlot categories={["region", "product"]} value="sales" zoomable={true} />,
                    data,
                    store,
                });

                await wait();

                const firstCell = container.querySelector("rect.treemap-cell");
                firstCell.dispatchEvent(new MouseEvent("click", { bubbles: true }));

                expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: [] }));
            });

            it("should lay out real (non-NaN) cell geometry once zoomed in", async () => {
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
                    children: <TreemapPlot categories={["region", "product"]} value="sales" zoomable={true} />,
                    data,
                    store,
                });

                await wait();

                const cells = Array.from(container.querySelectorAll("rect.treemap-cell"));
                expect(cells.length).toBeGreaterThan(0);

                for (const cell of cells) {
                    expect(Number(cell.getAttribute("x"))).not.toBeNaN();
                    expect(Number(cell.getAttribute("y"))).not.toBeNaN();
                    expect(Number(cell.getAttribute("width"))).not.toBeNaN();
                    expect(Number(cell.getAttribute("height"))).not.toBeNaN();
                }
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <TreemapPlot categories={["region", "product"]} value="sales" useCanvas={true} />
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
