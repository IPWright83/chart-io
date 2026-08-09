import React from "react";
import { render } from "@testing-library/react";

import { wait } from "../../../testUtils";
import { Dendrogram } from "./Dendrogram";

describe("Dendrogram", () => {
    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 5 },
        { region: "South", product: "Widgets", sales: 10 },
    ];

    it("should render without needing an external RectangularChart wrapper", async () => {
        const { container } = render(
            <Dendrogram categories={["region", "product"]} value="sales" data={data} width={200} height={200} />,
        );

        await wait();

        expect(container.querySelectorAll("circle.dendrogram-node").length).toBe(5);
    });

    it("should show a breadcrumb once zoomed in, when both zoomable and breadcrumb are set", async () => {
        const { container } = render(
            <Dendrogram
                categories={["region", "product"]}
                value="sales"
                data={data}
                width={200}
                height={200}
                animationDuration={0}
                zoomable={true}
                breadcrumb={true}
            />,
        );

        await wait();

        expect(container.querySelector(".zoom-breadcrumb")).toBeNull();

        const firstNode = container.querySelector("circle.dendrogram-node");
        firstNode.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        await wait();

        expect(container.querySelector(".zoom-breadcrumb")).not.toBeNull();
        expect(container.querySelector(".zoom-breadcrumb").textContent).toContain("North");
    });
});
