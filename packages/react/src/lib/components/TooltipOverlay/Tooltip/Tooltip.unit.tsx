import type { IColor } from "@d3-chart/types";
import React from "react";
import { render } from "@testing-library/react";

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
            { name: "a", value: 3, seriesType: "scatter", fill: "blue" as IColor },
            { name: "b", value: 8, seriesType: "column", fill: "orange" as IColor },
            { name: "c", value: 15, seriesType: "line", fill: "green" as IColor },
        ];

        const { asFragment } = render(<Tooltip borderColor="red" items={items} positionStyle={positionStyle} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", async () => {
        const { asFragment } = render(<Tooltip items={[]} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
