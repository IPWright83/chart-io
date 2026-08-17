import React from "react";
import { render } from "@testing-library/react";

import { VIRTUAL_CANVAS_DEBOUNCE } from "../../VirtualCanvas";
import { testMouseOver, wait } from "../../../testUtils";
import { WordCloud } from "./WordCloud";

describe("WordCloud", () => {
    const data = [
        { word: "chart", count: 50 },
        { word: "data", count: 30 },
        { word: "plot", count: 10 },
    ];

    // A fixed-size measurer keeps rendering (and its snapshots) independent of font metrics, which
    // vary by environment (canvas polyfill, installed fonts, ...) - scaled by fontSize like a real
    // measurer would, so painted glyphs stay inside each word's own non-overlapping layout box. Kept
    // small (minFontSize/maxFontSize below) so all 3 words comfortably fit the default plotMargin's
    // 140x140 plot area
    const measureText = (text: string, fontSize: number) => ({ width: text.length * fontSize * 0.4, height: fontSize * 1.1 });

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { container } = render(
                <WordCloud
                    category="word"
                    value="count"
                    data={data}
                    width={200}
                    height={200}
                    measureText={measureText}
                    minFontSize={8}
                    maxFontSize={20}
                />,
            );

            await wait();

            expect(container.querySelectorAll("text.word-cloud-word").length).toBe(3);
        });

        it("should render one word per row, using the category field as its text", async () => {
            const { container } = render(
                <WordCloud
                    category="word"
                    value="count"
                    data={data}
                    width={200}
                    height={200}
                    measureText={measureText}
                    minFontSize={8}
                    maxFontSize={20}
                />,
            );

            await wait();

            const words = Array.from(container.querySelectorAll("text.word-cloud-word")).map((el) => el.textContent);
            expect(words.sort()).toEqual(["chart", "data", "plot"]);
        });

        it("should handle mouseover/mouseout/click events", async () => {
            const onMouseOver = jest.fn();
            const onMouseOut = jest.fn();
            const onClick = jest.fn();

            const { container } = render(
                <WordCloud
                    category="word"
                    value="count"
                    data={data}
                    width={200}
                    height={200}
                    animationDuration={0}
                    measureText={measureText}
                    minFontSize={8}
                    maxFontSize={20}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onClick={onClick}
                />,
            );

            await wait();

            const word = container.querySelector("text.word-cloud-word");
            word.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
            word.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            word.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));

            expect(onMouseOver).toHaveBeenCalled();
            expect(onClick).toHaveBeenCalled();
            expect(onMouseOut).toHaveBeenCalled();
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = render(
                <WordCloud
                    category="word"
                    value="count"
                    data={data}
                    width={200}
                    height={200}
                    measureText={measureText}
                    minFontSize={8}
                    maxFontSize={20}
                    useCanvas={true}
                />,
            );

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            expect(container.querySelector(".canvas")).not.toBeNull();
            expect(container.querySelector(".virtual-canvas")).not.toBeNull();
        });

        it("should handle mouseover events via the virtual canvas", async () => {
            const onMouseOver = jest.fn();

            const { container } = render(
                <WordCloud
                    category="word"
                    value="count"
                    data={data}
                    width={200}
                    height={200}
                    animationDuration={0}
                    measureText={measureText}
                    minFontSize={8}
                    maxFontSize={20}
                    useCanvas={true}
                    onMouseOver={onMouseOver}
                />,
            );

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            // "chart" is the largest ("count": 50) word, so it's placed dead center of the chart - a
            // couple of pixels below its anchor point lands inside its painted glyphs
            await testMouseOver(container, ".virtual-canvas", onMouseOver, { word: "chart", count: 50 }, {
                bubbles: true,
                pageX: 100,
                pageY: 105,
            });
        });
    });
});
