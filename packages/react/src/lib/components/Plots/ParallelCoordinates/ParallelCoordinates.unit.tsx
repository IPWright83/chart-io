import React from "react";
import { render } from "@testing-library/react";

import { wait } from "../../../testUtils";
import { ParallelCoordinates } from "./ParallelCoordinates";

describe("ParallelCoordinates", () => {
    const data = [
        { food: "Apple", protein: 0.3, fat: 0.2, carbs: 14 },
        { food: "Steak", protein: 26, fat: 15, carbs: 0 },
        { food: "Bread", protein: 9, fat: 3, carbs: 49 },
    ];
    const dimensions = ["protein", "fat", "carbs"];

    it("should render correctly", async () => {
        const { container } = render(
            <ParallelCoordinates dimensions={dimensions} name="food" data={data} width={400} height={400} />,
        );

        await wait();

        expect(container.querySelectorAll("polyline.parallel-coordinates-line").length).toBe(data.length);
        expect(container.querySelectorAll("g.parallel-coordinates-axis").length).toBe(dimensions.length);
    });

    it("should not feature in the legend by default", async () => {
        const { container } = render(
            <ParallelCoordinates dimensions={dimensions} name="food" data={data} width={400} height={400} color="food" />,
        );

        await wait();

        expect(container.querySelectorAll(".legend-item").length).toBe(0);
    });

    it("should feature every category in the legend when color and showInLegend are set", async () => {
        const categorisedData = data.map((row, i) => ({ ...row, category: i % 2 === 0 ? "Fruit" : "Meat" }));

        const { container } = render(
            <ParallelCoordinates
                dimensions={dimensions}
                name="food"
                color="category"
                showInLegend={true}
                data={categorisedData}
                width={400}
                height={400}
            />,
        );

        await wait();

        expect(container.querySelectorAll(".legend-item").length).toBe(2);
    });
});
