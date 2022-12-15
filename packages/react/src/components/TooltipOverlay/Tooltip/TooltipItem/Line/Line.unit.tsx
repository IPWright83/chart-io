import React from "react";
import { render } from "@testing-library/react";

import { Line } from "./Line";

describe("Line", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<Line fill="#4682B4" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
