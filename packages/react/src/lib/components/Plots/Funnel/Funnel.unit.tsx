import React from "react";
import { render } from "@testing-library/react";

import { wait } from "../../../testUtils";
import { Funnel } from "./Funnel";

describe("Funnel", () => {
    const data = [
        { stage: "Visitors", count: 1000 },
        { stage: "Leads", count: 500 },
        { stage: "Customers", count: 100 },
    ];

    it("should render without needing an external chart wrapper", async () => {
        const { container } = render(
            <Funnel category="stage" value="count" data={data} width={200} height={200} />,
        );

        await wait();

        expect(container.querySelectorAll("polygon.funnel-segment").length).toBe(3);
    });

    it("should narrow from the widest segment at the top to the narrowest at the bottom", async () => {
        const { container } = render(
            <Funnel category="stage" value="count" data={data} width={200} height={200} animationDuration={0} />,
        );

        await wait();

        // The first two points of each polygon are its top-left/top-right corners (see FunnelBase),
        // so their x-distance is that segment's top-edge width
        const topWidthOf = (points: string) => {
            const [topLeft, topRight] = points.trim().split(/\s+/);
            return Number(topRight.split(",")[0]) - Number(topLeft.split(",")[0]);
        };

        const segments = Array.from(container.querySelectorAll("polygon.funnel-segment"));
        const topWidths = segments.map((segment) => topWidthOf(segment.getAttribute("points")));

        expect(topWidths[0]).toBeGreaterThan(topWidths[1]);
        expect(topWidths[1]).toBeGreaterThan(topWidths[2]);
    });
});
