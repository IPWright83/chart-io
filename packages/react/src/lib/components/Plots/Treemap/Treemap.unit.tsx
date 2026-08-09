import { buildHierarchy as defaultBuildHierarchy } from "@chart-io/core";

import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { Treemap } from "./Treemap";

expect.extend({ toMatchImageSnapshot });

import { actionsIncludes, getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("Treemap", () => {
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
                children: <Treemap categories={["region", "product"]} value="sales" />,
                data,
            });

            // Wait for the enter transition to settle so the snapshot deterministically
            // captures the final cell geometry rather than a mid-animation frame
            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should only render leaf cells", async () => {
            const { container } = await renderChart({
                children: <Treemap categories={["region", "product"]} value="sales" />,
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
                children: <Treemap categories={["region", "product", "sku"]} value="sales" />,
                data: threeLevelData,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should use a custom buildHierarchy function when provided", async () => {
            const customBuildHierarchy = jest.fn(defaultBuildHierarchy);

            const { container } = await renderChart({
                children: <Treemap categories={["region", "product"]} value="sales" buildHierarchy={customBuildHierarchy} />,
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
                    children: <Treemap categories={["region", "product"]} value="sales" onMouseOver={onMouseOver} />,
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
                    children: <Treemap categories={["region", "product"]} value="sales" onClick={onClick} />,
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
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <Treemap categories={["region", "product"]} value="sales" useCanvas={true} />
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
