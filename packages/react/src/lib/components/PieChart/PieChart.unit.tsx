import React from "react";
import { render } from "@testing-library/react";

import { PieChart } from "./PieChart";

jest.mock("../Chart/generateRandomID", () => {
    return { generateRandomID: () => "random-id" };
});

describe("PieChart", () => {
    it("should create empty template correctly", () => {
        const { asFragment } = render(<PieChart width={500} height={500} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
