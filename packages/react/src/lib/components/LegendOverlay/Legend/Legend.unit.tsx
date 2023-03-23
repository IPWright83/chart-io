import type { IColor } from "@d3-chart/types";
import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../../testUtils";

import { Legend } from "./Legend";

describe("Legend", () => {
    const store = createMockStore({});

    it("should render correctly", async () => {
        const positionStyle = {
            position: "absolute",
            left: 10,
            right: 20,
            top: 30,
            bottom: 40,
        };

        const items = [
            { name: "a", icon: "circle" as const, fill: "blue" as IColor },
            { name: "b", icon: "square" as const, fill: "orange" as IColor },
            { name: "c", icon: "line" as const, fill: "green" as IColor },
        ];

        const { asFragment } = render(
            <Provider store={store}>
                <Legend items={items} positionStyle={positionStyle} />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <Legend items={[]} />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
