import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { ChordPlot } from "./ChordPlot";

expect.extend({ toMatchImageSnapshot });

import { createMockStore, getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("ChordPlot", () => {
    const data = [
        { from: "A", to: "B", flow: 10 },
        { from: "A", to: "C", flow: 5 },
        { from: "B", to: "C", flow: 8 },
        { from: "C", to: "A", flow: 2 },
    ];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <ChordPlot source="from" target="to" value="flow" />,
                data,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render a group arc for every node and a ribbon for every flow pair", async () => {
            const { container } = await renderChart({
                children: <ChordPlot source="from" target="to" value="flow" />,
                data,
            });

            await wait();

            // 3 nodes (A, B, C)
            expect(container.querySelectorAll("path.chord-group").length).toBe(3);

            // A->B, A->C/C->A (combined into a single ribbon), B->C = 3 ribbons
            expect(container.querySelectorAll("path.chord-ribbon").length).toBe(3);
        });

        it("should hide labels when labels is false", async () => {
            const { container } = await renderChart({
                children: <ChordPlot source="from" target="to" value="flow" labels={false} />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("text.chord-label").length).toBe(0);
        });

        it("should exclude rows whose source equals its target from the matrix", async () => {
            const selfLoopData = [
                { from: "A", to: "A", flow: 5 },
                { from: "A", to: "B", flow: 10 },
            ];

            const { container } = await renderChart({
                children: <ChordPlot source="from" target="to" value="flow" />,
                data: selfLoopData,
            });

            await wait();

            expect(container.querySelectorAll("path.chord-group").length).toBe(2);
            expect(container.querySelectorAll("path.chord-ribbon").length).toBe(1);
        });

        describe("should handle event", () => {
            it("mouseover correctly on a group", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <ChordPlot source="from" target="to" value="flow" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "path.chord-group", onMouseOver, { from: "A", flow: expect.any(Number) });

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

            it("mouseover correctly on a ribbon", async () => {
                const onMouseOver = jest.fn();

                const { container } = await renderChart({
                    children: <ChordPlot source="from" target="to" value="flow" onMouseOver={onMouseOver} />,
                    data,
                });

                // First ribbon in DOM order connects A and B - A->B is the only row for that pair
                testMouseOver(container, "path.chord-ribbon", onMouseOver, { from: "A", to: "B", flow: 10 });
            });

            it("click correctly on a group", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: <ChordPlot source="from" target="to" value="flow" onClick={onClick} />,
                    data,
                });

                await testMouseClick(container, "path.chord-group", onClick, { from: "A", flow: expect.any(Number) });
            });

            it("click correctly on a ribbon", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: <ChordPlot source="from" target="to" value="flow" onClick={onClick} />,
                    data,
                });

                await testMouseClick(container, "path.chord-ribbon", onClick, { from: "A", to: "B", flow: 10 });
            });
        });

        it("should sort groups by total flow when sort is true", async () => {
            const store = createMockStore({
                chart: { animationDuration: 0, dimensions: { width: 200, height: 200 }, data },
            });

            const { container } = await renderChart({
                children: <ChordPlot source="from" target="to" value="flow" sort={true} />,
                data,
                store,
            });

            await wait();

            const labels = Array.from(container.querySelectorAll("text.chord-label")).map((el) => el.textContent);
            expect(labels).toEqual(expect.arrayContaining(["A", "B", "C"]));
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <ChordPlot source="from" target="to" value="flow" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            // Shapes and labels each render to their own Canvas layer - one per plot, the same way
            // <DendrogramPlot> renders its links/nodes/labels
            const canvases = container.querySelectorAll(".canvas");
            expect(canvases.length).toBe(2);

            const shapesBuffer = getBuffer(canvases[0] as HTMLCanvasElement);
            expect(shapesBuffer).toMatchImageSnapshot();

            const labelsBuffer = getBuffer(canvases[1] as HTMLCanvasElement);
            expect(labelsBuffer).toMatchImageSnapshot();

            const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
            expect(virtualCanvasBuffer).toMatchImageSnapshot();
        });
    });
});
