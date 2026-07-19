import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";
import { StackedDonut } from "./StackedDonut";

expect.extend({ toMatchImageSnapshot });

import { actionsIncludes, getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../../testUtils";

describe("StackedDonut", () => {
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
                children: <StackedDonut category="region" subCategory="product" value="sales" />,
                data,
            });

            // Wait for the enter transition to settle so the snapshot deterministically
            // captures the final arc geometry rather than a mid-animation frame
            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        describe("should handle event", () => {
            it("mouseover correctly on the inner ring", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <StackedDonut category="region" subCategory="product" value="sales" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                // The first slice in DOM order is the North parent node on the inner ring
                testMouseOver(container, "path.pie-slice", onMouseOver, { region: "North", sales: 10 });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("click correctly on the outer ring", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: <StackedDonut category="region" subCategory="product" value="sales" onClick={onClick} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                // The last slice in DOM order is the South/Widgets leaf on the outer ring
                await testMouseClick(container, "path.pie-slice:last-of-type", onClick, {
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
                        <StackedDonut category="region" subCategory="product" value="sales" useCanvas={true} />
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

        it("should handle a mouseover on the outer ring", async () => {
            const onMouseOver = jest.fn();

            const { container, store } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <StackedDonut category="region" subCategory="product" value="sales" onMouseOver={onMouseOver} useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            jest.spyOn(store, "dispatch");
            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            // North/Widgets occupies the first quarter of the circle (0deg-90deg) on the outer ring
            // (radius 68.5-100 with the default innerRadius/ringPadding), so aim for its mid-angle (45deg)
            await testMouseOver(container, ".virtual-canvas", onMouseOver, expectedDatum, {
                bubbles: true,
                pageX: 159,
                pageY: 41,
            });
        });
    });
});
