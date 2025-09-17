import { d3 } from "@chart-io/core";
import React from "react";

import { Bar, Line } from "../Plots";
import { renderChart, wait } from "../../testUtils";

import { ZoomBrush } from "./ZoomBrush";

describe("ZoomBrush", () => {
    it("renders if not required for the given plots", async () => {
        const data = [
            { x: 5, y: 5 },
            { x: 10, y: 10 },
        ];
        const scales = {
            x: d3.scaleLinear().domain([0, 20]).range([0, 100]),
            y: d3.scaleLinear().domain([0, 20]).range([0, 100]),
        };

        const { asFragment } = await renderChart({
            children: (
                <ZoomBrush size={100}>
                    <Line x="x" y="y" />
                </ZoomBrush>
            ),
            data,
            scales,
        });

        // Line plots sometimes take a short while to draw
        await wait(100);

        expect(asFragment()).toMatchSnapshot();
    });

    it("doesn't render if not required for the given plots", async () => {
        const data = [
            { x: 5, y: 5 },
            { x: 10, y: 10 },
        ];
        const scales = {
            x: d3.scaleLinear().domain([0, 20]).range([0, 100]),
            y: d3.scaleLinear().domain([0, 20]).range([0, 100]),
        };

        const { asFragment } = await renderChart({
            children: (
                <ZoomBrush size={100}>
                    <Bar x="x" y="y" />
                </ZoomBrush>
            ),
            data,
            scales,
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it("doesn't render if set to currently un-supported overlay", async () => {
        const data = [
            { x: 5, y: 5 },
            { x: 10, y: 10 },
        ];
        const scales = {
            x: d3.scaleLinear().domain([0, 20]).range([0, 100]),
            y: d3.scaleLinear().domain([0, 20]).range([0, 100]),
        };

        const { asFragment } = await renderChart({
            children: (
                <ZoomBrush size={100} type="overlay">
                    <Line x="x" y="y" />
                </ZoomBrush>
            ),
            data,
            scales,
        });

        // Line plots sometimes take a short while to draw
        await wait(100);

        expect(asFragment()).toMatchSnapshot();
    });
});
