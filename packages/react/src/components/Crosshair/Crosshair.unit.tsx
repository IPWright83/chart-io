import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { createMockStore } from "../../testUtils";
import { themes } from "../../themes";

import { Crosshair } from ".";
import { Crosshair as CrosshairBase } from "./Crosshair";

describe("Crosshair", () => {
    const store = createMockStore({
        chart: {
            dimensions: {
                width: 800,
                height: 400,
            },
            theme: themes.light,
        },
        event: {
            mouse: { x: 150, y: 200 },
        },
    });

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Crosshair />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there is no mouse coordinate", async () => {
        const store = createMockStore({
            chart: {
                dimensions: {
                    width: 800,
                    height: 400,
                },
                theme: themes.light,
            },
        });

        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Crosshair />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render just vertical lines correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Crosshair showHorizontal={false} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render just horizontal lines correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Crosshair showVertical={false} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
