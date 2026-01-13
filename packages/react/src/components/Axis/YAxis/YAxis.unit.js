import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { YAxis } from "./YAxis";

import { createStore, chartActions, chartSelectors } from "../../../store";

describe("YAxis", () => {
    const store = createStore();
    const scale = d3.scaleLinear().domain([0, 10]).range([0, 200]);

    store.dispatch(chartActions.setDimensions(200, 100, { left: 0, right: 0, top: 0, bottom: 0 }));
    store.dispatch(chartActions.setData([{ y: 0 }, { y: 5 }, { y: 10 }]));
    store.dispatch(chartActions.setScales(["y"], scale, true));

    it("renders correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <YAxis position="left" fields={["y"]} />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("creates a scale in the store correctly", () => {
        const store = createStore();

        store.dispatch(chartActions.setDimensions(200, 100, { left: 0, right: 0, top: 0, bottom: 0 }));
        store.dispatch(chartActions.setData([{ y: 0 }, { y: 5 }, { y: 10 }]));

        render(
            <Provider store={store}>
                <svg>
                    <YAxis position="left" fields={["y"]} />
                </svg>
            </Provider>,
        );

        const scale = chartSelectors.scales.getScale(store.getState(), "y");
        expect(scale).toBeDefined();
        expect(scale.domain()).toEqual([0, 10]);
        expect(scale.range()).toEqual([100, 0]);
    });
});
