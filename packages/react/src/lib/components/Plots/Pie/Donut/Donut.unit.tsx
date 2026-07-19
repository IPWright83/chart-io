import React from "react";

import { renderChart, wait } from "../../../../testUtils";
import { Donut } from "./Donut";

describe("Donut", () => {
    const data = [
        { category: "A", value: 5 },
        { category: "B", value: 10 },
    ];

    it("should default to a non-zero innerRadius", async () => {
        const { asFragment } = await renderChart({
            children: <Donut category="category" value="value" />,
            data,
        });

        // Wait for the enter transition to settle so the snapshot deterministically
        // captures the final arc geometry rather than a mid-animation frame
        await wait();
        expect(asFragment()).toMatchSnapshot();
    });

    it("should allow the innerRadius to be overridden", async () => {
        const { asFragment } = await renderChart({
            children: <Donut category="category" value="value" innerRadius={0.2} />,
            data,
        });

        await wait();
        expect(asFragment()).toMatchSnapshot();
    });
});
