import React from "react";
import { render } from "@testing-library/react";

import { VerticalBand } from ".";

describe("VerticalBand", () => {
    it("should render correctly", async () => {
        const { asFragment } = render(
            <svg>
                <VerticalBand x={20} y={50} width={150} height={70} fill="red" opacity={0.05} />
            </svg>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if missing scale", () => {
        const { asFragment } = render(
            <svg>
                <VerticalBand key="foo" />
            </svg>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
