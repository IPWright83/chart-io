import type { IColor } from "@d3-chart/types";
import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../../testUtils";

import { Tooltip } from ".";

describe("Tooltip", () => {
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
            { name: "a", value: 3, icon: "circle" as const, fill: "blue" as IColor },
            { name: "b", value: 8, icon: "square" as const, fill: "orange" as IColor },
            { name: "c", value: 15, icon: "line" as const, fill: "green" as IColor },
        ];

        const { asFragment } = render(
            <Provider store={store}>
                <Tooltip borderColor="red" items={items} positionStyle={positionStyle} />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <Tooltip items={[]} />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
