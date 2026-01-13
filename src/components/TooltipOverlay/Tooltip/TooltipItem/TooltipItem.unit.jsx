import React from "react";
import { render } from "@testing-library/react";

import { TooltipItem } from ".";

describe("TooltipItem", () => {
    it("should render correctly", async () => {
        const { asFragment } = render(<TooltipItem name="Series1" value={5} seriesType="scatter" fill="red" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
