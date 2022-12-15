import React from "react";
import { render } from "@testing-library/react";

import type { IColor } from "../../../../types";

import { TooltipItem } from ".";

describe("TooltipItem", () => {
    it("should render correctly", async () => {
        const { asFragment } = render(
            <TooltipItem name="Series1" value={5} seriesType={"scatter" as const} fill={"#ff0000" as IColor} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
