import React from "react";

import { wait } from "../../../testUtils";

import { HeatmapAxes } from "./HeatmapAxes";
import { Heatmap } from "./Heatmap";

import { render } from "@testing-library/react";

describe("HeatmapAxes", () => {
    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 8 },
        { region: "South", product: "Widgets", sales: 10 },
        { region: "South", product: "Gadgets", sales: 3 },
    ];

    it("should render a band x/y-axis for both row and column values in the grid layout", async () => {
        const { container } = render(
            <Heatmap rows="region" columns="product" value="sales" data={data} width={300} height={300} />,
        );

        await wait();

        const xTicks = Array.from(container.querySelectorAll(".axis-bottom .tick text")).map((t) => t.textContent);
        const yTicks = Array.from(container.querySelectorAll(".axis-left .tick text")).map((t) => t.textContent);

        expect(xTicks).toEqual(["Widgets", "Gadgets"]);
        expect(yTicks).toEqual(["North", "South"]);
    });

    it("is exported for advanced composition, alongside HeatmapPlot", () => {
        expect(HeatmapAxes).toBeDefined();
    });
});
