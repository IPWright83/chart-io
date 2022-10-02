import React from "react";
import { render } from "@testing-library/react";

import { Rect } from ".";

describe("Rect", () => {
    it("should render correctly", async () => {
        const { asFragment } = render(
            <svg>
                <Rect x={20} y={50} width={150} height={70} fill="red" opacity={0.05} />
            </svg>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if missing dimension properties", () => {
        const { asFragment } = render(
            <svg>
                <Rect />
            </svg>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
