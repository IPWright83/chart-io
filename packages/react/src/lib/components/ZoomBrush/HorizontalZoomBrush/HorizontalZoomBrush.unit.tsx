import * as d3 from "@chart-io/d3";
import React from "react";

import { renderChart, wait } from "../../../testUtils";
import { Line } from "../../Plots";

import { HorizontalZoomBrush } from "./HorizontalZoomBrush";

describe("HorizontalZoomBrush", () => {
    it("renders correctly", async () => {
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
                <HorizontalZoomBrush height={100}>
                    <Line x="x" y="y" />
                </HorizontalZoomBrush>
            ),
            data,
            scales,
        });

        await wait(100);

        expect(asFragment()).toMatchSnapshot();
    });
});
