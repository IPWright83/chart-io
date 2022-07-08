import React from "react";
import { render } from "@testing-library/react";

import { Polygon } from ".";

describe("Polygon", () => {
    it("should render correctly", async () => {
        const points = "0,100 50,25 50,75 100,0";
        const { asFragment } = render(
            <svg>
                <Polygon fill="red" opacity={0.05} points={points} />
            </svg>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if given no points", () => {
        const { asFragment } = render(
            <svg>
                <Polygon />
            </svg>,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
