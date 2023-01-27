import React from "react";
import { render } from "@testing-library/react";

import { XYChart } from "./XYChart";

describe("XYChart", () => {
    it("should create empty template correctly", () => {
        const { asFragment } = render(<XYChart width={500} height={500} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
