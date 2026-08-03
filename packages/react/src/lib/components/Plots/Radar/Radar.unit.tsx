import { d3 } from "@chart-io/core";
import React from "react";

import { renderChart, wait } from "../../../testUtils";
import { Radar } from "./Radar";

describe("Radar", () => {
    // One row per series
    const data = [
        { player: "playerX", A: 50, B: 80, C: 30 },
        { player: "playerY", A: 20, B: 40, C: 90 },
    ];

    const scales = {
        category: d3.scalePoint().domain(["A", "B", "C"]).range([0, (2 * Math.PI * 2) / 3]),
        A: d3.scaleLinear().domain([0, 100]).range([0, 100]),
        B: d3.scaleLinear().domain([0, 100]).range([0, 100]),
        C: d3.scaleLinear().domain([0, 100]).range([0, 100]),
    };

    const ys = ["A", "B", "C"];

    it("should render one series per row of data", async () => {
        const { container } = await renderChart({
            children: <Radar category="category" name="player" ys={ys} />,
            data,
            scales,
        });

        await wait();
        expect(container.querySelectorAll(".radar-shape").length).toBe(2);
    });

    it("should assign each series a different color from the palette", async () => {
        const { asFragment } = await renderChart({
            children: <Radar category="category" name="player" ys={ys} />,
            data,
            scales,
        });

        await wait();
        expect(asFragment()).toMatchSnapshot();
    });
});
