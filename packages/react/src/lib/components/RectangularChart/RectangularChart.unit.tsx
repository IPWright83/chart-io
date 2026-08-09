import React from "react";
import { render } from "@testing-library/react";

import { RectangularChart } from "./RectangularChart";

jest.mock("../Chart/generateRandomID", () => {
    return { generateRandomID: () => "random-id" };
});

describe("RectangularChart", () => {
    it("should create empty template correctly", () => {
        const { asFragment } = render(<RectangularChart width={500} height={500} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
