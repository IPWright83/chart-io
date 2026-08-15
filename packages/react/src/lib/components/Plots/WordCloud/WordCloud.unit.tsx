import React from "react";
import { render } from "@testing-library/react";

import { wait } from "../../../testUtils";
import { WordCloud } from "./WordCloud";

describe("WordCloud", () => {
    const data = [
        { word: "chart", count: 50 },
        { word: "data", count: 30 },
        { word: "plot", count: 10 },
    ];

    const measureText = () => ({ width: 40, height: 14 });

    it("should render without needing an external chart wrapper", async () => {
        const { container } = render(
            <WordCloud category="word" value="count" data={data} width={200} height={200} measureText={measureText} />,
        );

        await wait();

        expect(container.querySelectorAll("text.word-cloud-word").length).toBe(3);
    });

    it("should render one word per row, using the category field as its text", async () => {
        const { container } = render(
            <WordCloud category="word" value="count" data={data} width={200} height={200} measureText={measureText} />,
        );

        await wait();

        const words = Array.from(container.querySelectorAll("text.word-cloud-word")).map((el) => el.textContent);
        expect(words.sort()).toEqual(["chart", "data", "plot"]);
    });
});
