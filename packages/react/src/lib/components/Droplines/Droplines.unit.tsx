import { themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { Droplines } from ".";
import { Droplines as DroplinesBase } from "./Droplines";

describe("Droplines", () => {
    const store = createMockStore({
        chart: {
            theme: themes.light,
        },
        event: {
            droplines: [
                { isHorizontal: true, color: "red", x1: 50, x2: 0, y1: 50, y2: 50 },
                { isVertical: true, color: "red", x1: 50, x2: 50, y1: 50, y2: 0 },
            ],
        },
    });

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Droplines />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render just vertical lines correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Droplines showHorizontal={false} />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render just horizontal lines correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Droplines showVertical={false} />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should skip if there is no layer avaliable", () => {
        const layer = { current: null };

        render(
            <Provider store={store}>
                <svg>
                    <DroplinesBase layer={layer} />
                </svg>
            </Provider>,
        );

        // Should be empty
        expect(layer).toMatchSnapshot();
    });
});
