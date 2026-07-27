import React from "react";
import { render } from "@testing-library/react";

import { RadialChart } from "./RadialChart";

jest.mock("../Chart/generateRandomID", () => {
    return { generateRandomID: () => "random-id" };
});

describe("RadialChart", () => {
    it("should create empty template correctly", () => {
        const { asFragment } = render(<RadialChart width={500} height={500} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
