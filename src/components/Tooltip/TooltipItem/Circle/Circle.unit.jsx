import React from "react";
import { render } from "@testing-library/react";

import { Circle } from "./Circle";

describe("Circle", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<Circle fill="steelblue" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
