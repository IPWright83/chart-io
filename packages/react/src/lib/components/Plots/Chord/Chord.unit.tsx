import React from "react";
import { render } from "@testing-library/react";

import { wait } from "../../../testUtils";
import { Chord } from "./Chord";

describe("Chord", () => {
    const data = [
        { from: "A", to: "B", flow: 10 },
        { from: "A", to: "C", flow: 5 },
        { from: "B", to: "C", flow: 8 },
        { from: "C", to: "A", flow: 2 },
    ];

    it("should render correctly", async () => {
        const { container } = render(
            <Chord source="from" target="to" value="flow" data={data} width={400} height={400} />,
        );

        await wait();

        expect(container.querySelectorAll("path.chord-group").length).toBe(3);
        expect(container.querySelectorAll("path.chord-ribbon").length).toBe(3);
    });

    it("should not feature in the legend by default", async () => {
        const { container } = render(
            <Chord source="from" target="to" value="flow" data={data} width={400} height={400} />,
        );

        await wait();

        expect(container.querySelectorAll(".legend-item").length).toBe(0);
    });

    it("should feature every node in the legend when showInLegend is true", async () => {
        const { container } = render(
            <Chord source="from" target="to" value="flow" data={data} width={400} height={400} showInLegend={true} />,
        );

        await wait();

        expect(container.querySelectorAll(".legend-item").length).toBe(3);
    });
});
