import { chartActions, chartSelectors, createStore } from "@chart-io/core";
import { d3 } from "@chart-io/core";

import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import { XAxis } from "./XAxis";

describe("XAxis", () => {
    const store = createStore();
    const scale = d3.scaleLinear().domain([0, 10]).range([0, 200]);

    store.dispatch(chartActions.setDimensions({
        width: 200,
        height: 100,
        margin: { left: 0, right: 0, top: 0, bottom: 0 }
    }));
    store.dispatch(chartActions.setChartData([{ x: 0 }, { x: 5 }, { x: 10 }]));
    store.dispatch(chartActions.setScales({ fields: ["x"], scale }));

    it("renders correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <XAxis position="bottom" fields={["x"]} />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("creates a scale in the store correctly", () => {
        const store = createStore();

        store.dispatch(chartActions.setDimensions({
            width: 200,
            height: 100,
            margin: { left: 0, right: 0, top: 0, bottom: 0 }
        }));
        store.dispatch(chartActions.setChartData([{ x: 0 }, { x: 5 }, { x: 10 }]));

        render(
            <Provider store={store}>
                <svg>
                    <XAxis position="bottom" fields={["x"]} />
                </svg>
            </Provider>,
        );

        const scale = chartSelectors.scales.getScale(store.getState(), "x", "plot");
        expect(scale).toBeDefined();
        expect(scale.domain()).toEqual([0, 10]);
        expect(scale.range()).toEqual([0, 200]);
    });
});
