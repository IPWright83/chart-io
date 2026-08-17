import React from "react";
import { render } from "@testing-library/react";

import { wait } from "../../../testUtils";

import { Heatmap } from "./Heatmap";

describe("Heatmap", () => {
    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 8 },
        { region: "South", product: "Widgets", sales: 10 },
        { region: "South", product: "Gadgets", sales: 3 },
    ];

    it("should render without needing an external chart wrapper", async () => {
        const { container } = render(
            <Heatmap rows="region" columns="product" value="sales" data={data} width={200} height={200} />,
        );

        await wait();

        expect(container.querySelectorAll("rect.heatmap-cell").length).toBe(4);
    });

    it("should reorder rows once rowsGrouped is set, animating the change on re-render", async () => {
        const groupedData = [
            { region: "North", store: "A", product: "Widgets", sales: 5 },
            { region: "South", store: "B", product: "Widgets", sales: 10 },
            { region: "North", store: "C", product: "Widgets", sales: 7 },
        ];

        const { container } = render(
            <Heatmap
                rows="store"
                columns="product"
                value="sales"
                rowGroupBy="region"
                rowsGrouped={true}
                data={groupedData}
                width={200}
                height={200}
                animationDuration={0}
            />,
        );

        await wait();

        const labels = Array.from(container.querySelectorAll("text.heatmap-row-label")).map((label) => label.textContent);
        expect(labels).toEqual(["A", "C", "B"]);
    });
});
