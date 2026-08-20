import { buildSankeyGraph as defaultBuildSankeyGraph } from "@chart-io/core";

import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { SankeyPlot } from "./SankeyPlot";

expect.extend({ toMatchImageSnapshot });

import { actionsIncludes, getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("SankeyPlot", () => {
    const data = [
        { source: "Coal", destination: "Electricity", amount: 5 },
        { source: "Gas", destination: "Electricity", amount: 3 },
    ];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <SankeyPlot categories={["source", "destination"]} value="amount" />,
                data,
            });

            // Wait for the enter transition to settle so the snapshot deterministically
            // captures the final node/link geometry rather than a mid-animation frame
            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render one node per distinct value and one link per source/target pair", async () => {
            const { container } = await renderChart({
                children: <SankeyPlot categories={["source", "destination"]} value="amount" />,
                data,
            });

            await wait();

            // Coal, Gas and (the shared) Electricity
            expect(container.querySelectorAll("rect.sankey-node").length).toBe(3);
            // Coal -> Electricity, Gas -> Electricity
            expect(container.querySelectorAll("path.sankey-link").length).toBe(2);
        });

        it("should render a node label for every node by default", async () => {
            const { container } = await renderChart({
                children: <SankeyPlot categories={["source", "destination"]} value="amount" />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("text.sankey-label").length).toBe(3);
        });

        it("should not render labels when labels is false", async () => {
            const { container } = await renderChart({
                children: <SankeyPlot categories={["source", "destination"]} value="amount" labels={false} />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("text.sankey-label").length).toBe(0);
        });

        it("should use a custom buildSankeyGraph function when provided", async () => {
            const customBuildSankeyGraph = jest.fn(defaultBuildSankeyGraph);

            const { container } = await renderChart({
                children: (
                    <SankeyPlot categories={["source", "destination"]} value="amount" buildSankeyGraph={customBuildSankeyGraph} />
                ),
                data,
            });

            await wait();

            expect(customBuildSankeyGraph).toHaveBeenCalledWith(data, ["source", "destination"], "amount", "Sankey");
            expect(container.querySelectorAll("rect.sankey-node").length).toBe(3);
        });

        describe("should handle events on a node", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <SankeyPlot categories={["source", "destination"]} value="amount" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "rect.sankey-node", onMouseOver, { source: "Coal" });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: <SankeyPlot categories={["source", "destination"]} value="amount" onClick={onClick} />,
                    data,
                });

                await testMouseClick(container, "rect.sankey-node", onClick, { source: "Coal" });
            });
        });

        describe("should handle events on a link", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <SankeyPlot categories={["source", "destination"]} value="amount" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "path.sankey-link", onMouseOver, {
                    source: "Coal",
                    destination: "Electricity",
                    amount: 5,
                });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: <SankeyPlot categories={["source", "destination"]} value="amount" onClick={onClick} />,
                    data,
                });

                await testMouseClick(container, "path.sankey-link", onClick, {
                    source: "Coal",
                    destination: "Electricity",
                    amount: 5,
                });
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <SankeyPlot categories={["source", "destination"]} value="amount" useCanvas={true} />
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
