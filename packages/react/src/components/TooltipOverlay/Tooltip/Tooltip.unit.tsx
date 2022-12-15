import React from "react";
import { render } from "@testing-library/react";

import type { IColor } from "../../../types";

import { Tooltip } from ".";

describe("Tooltip", () => {
    it("should render correctly", async () => {
        const positionStyle = {
            position: "absolute",
            left: 10,
            right: 20,
            top: 30,
            bottom: 40,
        };

        const items = [
            { name: "a", value: 3, seriesType: "scatter" as const, fill: "#0000ff" as IColor },
            { name: "b", value: 8, seriesType: "column" as const, fill: "#ffa500" as IColor },
            { name: "c", value: 15, seriesType: "line" as const, fill: "#008000" as IColor },
        ];

        const { asFragment } = render(<Tooltip borderColor="red" items={items} positionStyle={positionStyle} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", async () => {
        const { asFragment } = render(<Tooltip items={[]} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
