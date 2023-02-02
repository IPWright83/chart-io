import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { XAxis } from "./XAxis";

import { createStore, chartActions, chartSelectors } from "../../../store";

describe("XAxis", () => {
    const store = createStore();
    const scale = d3.scaleLinear().domain([0, 10]).range([0, 200]);

    store.dispatch(chartActions.setDimensions(200, 100, { left: 0, right: 0, top: 0, bottom: 0 }));
    store.dispatch(chartActions.setData([{ x: 0 }, { x: 5 }, { x: 10 }]));
    chartActions.setScales(["x"], scale, true)(store.dispatch);

    it("renders correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <XAxis position="bottom" fields={["x"]} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("creates a scale in the store correctly", () => {
        const store = createStore();

        store.dispatch(chartActions.setDimensions(200, 100, { left: 0, right: 0, top: 0, bottom: 0 }));
        store.dispatch(chartActions.setData([{ x: 0 }, { x: 5 }, { x: 10 }]));

        render(
            <Provider store={store}>
                <svg>
                    <XAxis position="bottom" fields={["x"]} />
                </svg>
            </Provider>
        );

        const scale = chartSelectors.scales.getScale(store.getState(), "x");
        expect(scale).toBeDefined();
        expect(scale.domain()).toEqual([0, 10]);
        expect(scale.range()).toEqual([0, 200]);
    });
});
