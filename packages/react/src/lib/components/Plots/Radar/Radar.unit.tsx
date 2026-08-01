import { d3 } from "@chart-io/core";
import React from "react";

import { renderChart, wait } from "../../../testUtils";
import { Radar } from "./Radar";

describe("Radar", () => {
    const data = [
        { skill: "A", playerX: 50, playerY: 20 },
        { skill: "B", playerX: 80, playerY: 40 },
        { skill: "C", playerX: 30, playerY: 90 },
    ];

    const scales = {
        skill: d3.scalePoint().domain(["A", "B", "C"]).range([0, (2 * Math.PI * 2) / 3]),
        playerX: d3.scaleLinear().domain([0, 100]).range([0, 100]),
        playerY: d3.scaleLinear().domain([0, 100]).range([0, 100]),
    };

    it("should render one series per field in ys", async () => {
        const { container } = await renderChart({
            children: <Radar category="skill" ys={["playerX", "playerY"]} />,
            data,
            scales,
        });

        await wait();
        expect(container.querySelectorAll(".radar-shape").length).toBe(2);
    });

    it("should assign each series a different color from the palette", async () => {
        const { asFragment } = await renderChart({
            children: <Radar category="skill" ys={["playerX", "playerY"]} />,
            data,
            scales,
        });

        await wait();
        expect(asFragment()).toMatchSnapshot();
    });
});
