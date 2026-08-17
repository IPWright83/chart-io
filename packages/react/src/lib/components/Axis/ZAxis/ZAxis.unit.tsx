import { chartActions, themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../../testUtils";

import { ZAxis } from ".";

describe("ZAxis", () => {
    const width = 200;
    const height = 200;

    const store = createMockStore({
        chart: {
            theme: themes.light,
            animationDuration: 0,
            dimensions: { width, height },
            data: [{ population: 10 }, { population: 50 }, { population: 100 }],
        },
    });

    beforeEach(() => {
        (store.dispatch as jest.Mock).mockClear();
    });

    it("should build a scale for the field and register a size legend describing it", () => {
        render(
            <Provider store={store}>
                <svg>
                    <ZAxis fields="population" ticks={5} />
                </svg>
            </Provider>,
        );

        const dispatchedActions = (store.dispatch as jest.Mock).mock.calls.map((call) => call[0]);

        expect(dispatchedActions).toContainEqual(
            chartActions.setSizeLegend({
                field: "population",
                ticks: 5,
                tickValues: undefined,
                tickFormat: undefined,
            }),
        );

        const setScalesCall = dispatchedActions.find((action) => action.type === chartActions.setScales.type);
        expect(setScalesCall.payload.fields).toEqual(["population"]);
        expect(setScalesCall.payload.scale.range()).toEqual([5, 25]);
    });

    it("should use an explicit range/tickValues/tickFormat when provided", () => {
        const tickFormat = (value) => `${value}%`;

        render(
            <Provider store={store}>
                <svg>
                    <ZAxis fields="population" range={[2, 40]} tickValues={[10, 100]} tickFormat={tickFormat} />
                </svg>
            </Provider>,
        );

        const dispatchedActions = (store.dispatch as jest.Mock).mock.calls.map((call) => call[0]);

        expect(dispatchedActions).toContainEqual(
            chartActions.setSizeLegend({
                field: "population",
                ticks: 3,
                tickValues: [10, 100],
                tickFormat,
            }),
        );

        const setScalesCall = dispatchedActions.find((action) => action.type === chartActions.setScales.type);
        expect(setScalesCall.payload.scale.range()).toEqual([2, 40]);
    });

    it("should clear the size legend on unmount", () => {
        const { unmount } = render(
            <Provider store={store}>
                <svg>
                    <ZAxis fields="population" />
                </svg>
            </Provider>,
        );

        (store.dispatch as jest.Mock).mockClear();
        unmount();

        const dispatchedActions = (store.dispatch as jest.Mock).mock.calls.map((call) => call[0]);
        expect(dispatchedActions).toContainEqual(chartActions.clearSizeLegend());
    });
});
