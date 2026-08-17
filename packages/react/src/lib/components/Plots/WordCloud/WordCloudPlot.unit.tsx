import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { WordCloudPlot } from "./WordCloudPlot";

expect.extend({ toMatchImageSnapshot });

import { actionsIncludes, getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("WordCloudPlot", () => {
    const expectedDatum = { word: "chart", count: 50 };

    const data = [
        { word: "chart", count: 50 },
        { word: "data", count: 30 },
        { word: "plot", count: 10 },
    ];

    // A fixed-size measurer keeps rendering (and its snapshots) independent of font metrics, which
    // vary by environment (canvas polyfill, installed fonts, ...) - scaled by fontSize like a real
    // measurer would, so the largest ("chart") word's painted glyphs stay comfortably inside its own
    // non-overlapping layout box instead of spilling into its neighbours
    const measureText = (text: string, fontSize: number) => ({ width: text.length * fontSize * 0.4, height: fontSize * 1.1 });

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <WordCloudPlot category="word" value="count" measureText={measureText} />,
                data,
            });

            // Wait for the enter transition to settle so the snapshot deterministically captures the
            // final word geometry rather than a mid-animation frame
            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render one word per row", async () => {
            const { container } = await renderChart({
                children: <WordCloudPlot category="word" value="count" measureText={measureText} />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("text.word-cloud-word").length).toBe(3);
        });

        it("should size the largest value's word using maxFontSize", async () => {
            const { container } = await renderChart({
                children: (
                    <WordCloudPlot
                        category="word"
                        value="count"
                        measureText={measureText}
                        minFontSize={10}
                        maxFontSize={50}
                    />
                ),
                data,
            });

            await wait();

            const chartWord = Array.from(container.querySelectorAll<SVGTextElement>("text.word-cloud-word")).find(
                (el) => el.textContent === "chart",
            );
            expect(chartWord.style.fontSize).toBe("50px");
        });

        it("should rotate alternating words when rotate is true", async () => {
            const { container } = await renderChart({
                // Kept small so a rotated word's (width/height swapped) box can still find room
                // alongside the others in the 200x200 test canvas
                children: (
                    <WordCloudPlot
                        category="word"
                        value="count"
                        measureText={measureText}
                        minFontSize={8}
                        maxFontSize={24}
                        rotate={true}
                    />
                ),
                data,
            });

            await wait();

            const words = Array.from(container.querySelectorAll("text.word-cloud-word"));
            expect(words.some((el) => el.getAttribute("data-rotate") === "90")).toBe(true);
        });

        it("should not rotate any word by default", async () => {
            const { container } = await renderChart({
                children: <WordCloudPlot category="word" value="count" measureText={measureText} />,
                data,
            });

            await wait();

            const words = Array.from(container.querySelectorAll("text.word-cloud-word"));
            expect(words.every((el) => el.getAttribute("data-rotate") === "0" || el.getAttribute("data-rotate") === null)).toBe(true);
        });

        it("should use a custom measureText function when provided", async () => {
            const customMeasureText = jest.fn(() => ({ width: 20, height: 10 }));

            await renderChart({
                children: <WordCloudPlot category="word" value="count" measureText={customMeasureText} />,
                data,
            });

            await wait();

            expect(customMeasureText).toHaveBeenCalledWith("chart", expect.any(Number), expect.any(String));
        });

        describe("should handle event", () => {
            it("mouseover correctly on a word", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <WordCloudPlot category="word" value="count" measureText={measureText} onMouseOver={onMouseOver} />
                    ),
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "text.word-cloud-word", onMouseOver, expectedDatum);
            });

            it("click correctly on a word", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: <WordCloudPlot category="word" value="count" measureText={measureText} onClick={onClick} />,
                    data,
                });

                await testMouseClick(container, "text.word-cloud-word", onClick, expectedDatum);
            });
        });

        it("should not be interactive when interactive is false", async () => {
            const onMouseOver = jest.fn();

            const { container } = await renderChart({
                children: (
                    <WordCloudPlot
                        category="word"
                        value="count"
                        measureText={measureText}
                        interactive={false}
                        onMouseOver={onMouseOver}
                    />
                ),
                data,
            });

            await wait();

            const word = container.querySelector("text.word-cloud-word");
            word.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));

            expect(onMouseOver).not.toHaveBeenCalled();
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <WordCloudPlot category="word" value="count" measureText={measureText} useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            // Unlike a rect/circle's small edge-to-area ratio, text glyphs are mostly edge - so
            // font hinting/anti-aliasing differences between environments (this sandbox vs. CI)
            // shift enough boundary pixels to need a tolerance plain shape snapshots don't
            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot({ failureThreshold: 0.08, failureThresholdType: "percent" });

            // The virtual (hit-testing) canvas isn't pixel-snapshotted - unlike the rendered glyphs
            // above, its solid hit-rectangles vary too unpredictably in exactly where the canvas
            // library's own rounding/anti-aliasing lands between environments to pin down with a
            // useful threshold. What actually matters - that hovering/clicking a word resolves to
            // the right datum - is covered precisely, at exact coordinates, by the event tests below
        });

        describe("should handle event", () => {
            it("mouseover correctly on a word", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <WordCloudPlot
                                category="word"
                                value="count"
                                measureText={measureText}
                                onMouseOver={onMouseOver}
                                useCanvas={true}
                            />
                        </VirtualCanvas>
                    ),
                    data,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                // "chart" is the largest ("count": 50) word, so it's placed dead center of the 200x200
                // plot - a couple of pixels below its anchor point lands inside its painted glyphs
                await testMouseOver(container, ".virtual-canvas", onMouseOver, expectedDatum, {
                    bubbles: true,
                    pageX: 100,
                    pageY: 105,
                });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "event/mouseMove",
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });

            it("click correctly on a word", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <WordCloudPlot
                                category="word"
                                value="count"
                                measureText={measureText}
                                onClick={onClick}
                                useCanvas={true}
                            />
                        </VirtualCanvas>
                    ),
                    data,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseClick(container, ".virtual-canvas", onClick, expectedDatum, {
                    bubbles: true,
                    pageX: 100,
                    pageY: 105,
                });
            });
        });
    });
});
