import React from "react";
import { render } from "@testing-library/react";

import { wait } from "../../../testUtils";
import { Sankey } from "./Sankey";

describe("Sankey", () => {
    const data = [
        { source: "Coal", stage: "Electricity", destination: "Homes", amount: 5 },
        { source: "Gas", stage: "Electricity", destination: "Industry", amount: 3 },
    ];

    it("should render without needing an external Chart wrapper", async () => {
        const { container } = render(
            <Sankey categories={["source", "stage", "destination"]} value="amount" data={data} width={200} height={200} />,
        );

        await wait();

        // Coal, Gas, the shared Electricity node, Homes and Industry
        expect(container.querySelectorAll("rect.sankey-node").length).toBe(5);
    });

    it("should render a link for every consecutive pair of columns", async () => {
        const { container } = render(
            <Sankey categories={["source", "stage", "destination"]} value="amount" data={data} width={200} height={200} />,
        );

        await wait();

        // Coal -> Electricity, Gas -> Electricity, Electricity -> Homes, Electricity -> Industry
        expect(container.querySelectorAll("path.sankey-link").length).toBe(4);
    });
});
