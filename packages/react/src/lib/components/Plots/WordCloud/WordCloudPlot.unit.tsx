import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { WordCloudPlot } from "./WordCloudPlot";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("WordCloudPlot", () => {
    const expectedDatum = { word: "chart", count: 50 };

    const data = [
        { word: "chart", count: 50 },
        { word: "data", count: 30 },
        { word: "plot", count: 10 },
    ];

    // A fixed-size measurer keeps rendering (and its snapshots) independent of font metrics, which
    // vary by environment (canvas polyfill, installed fonts, ...)
    const measureText = (text: string) => ({ width: text.length * 8, height: 14 });

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
                children: <WordCloudPlot category="word" value="count" measureText={measureText} rotate={true} />,
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

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();

            const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
            expect(virtualCanvasBuffer).toMatchImageSnapshot();
        });
    });
});
