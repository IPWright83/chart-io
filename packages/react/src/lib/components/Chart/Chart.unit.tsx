import React from "react";
import { render } from "@testing-library/react";

import { Chart } from "./index";

jest.mock("./generateRandomID", () => {
    return { generateRandomID: () => "random-id" };
});

describe("Chart", () => {
    it("should default to role=img with a generic aria-label when no title is given", () => {
        const { container } = render(<Chart width={200} height={200} />);

        const svg = container.querySelector("svg.chart-svg");
        expect(svg).toHaveAttribute("role", "img");
        expect(svg).toHaveAttribute("aria-label", "Chart");
        expect(svg).toHaveAttribute("tabindex", "0");
        expect(svg.querySelector("title")).toBeNull();
        expect(svg.querySelector("desc")).toBeNull();
    });

    it("should expose the title as the accessible name via aria-labelledby", () => {
        const { container } = render(<Chart width={200} height={200} title="Quarterly revenue" />);

        const svg = container.querySelector("svg.chart-svg");
        const title = svg.querySelector("title");

        expect(title).not.toBeNull();
        expect(title.textContent).toBe("Quarterly revenue");
        expect(svg).toHaveAttribute("aria-labelledby", title.id);
        expect(svg).not.toHaveAttribute("aria-label");
    });

    it("should expose the description via aria-describedby", () => {
        const { container } = render(
            <Chart width={200} height={200} title="Quarterly revenue" description="Revenue grew every quarter" />,
        );

        const svg = container.querySelector("svg.chart-svg");
        const description = svg.querySelector("desc");

        expect(description).not.toBeNull();
        expect(description.textContent).toBe("Revenue grew every quarter");
        expect(svg).toHaveAttribute("aria-describedby", description.id);
    });

    it("should allow the role to be overridden", () => {
        const { container } = render(<Chart width={200} height={200} title="Revenue" role="graphics-document" />);

        const svg = container.querySelector("svg.chart-svg");
        expect(svg).toHaveAttribute("role", "graphics-document");
    });
});
