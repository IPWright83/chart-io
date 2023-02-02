import type { IData, IScale } from "@d3-chart/types";
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { wait } from "./wait";
import { createMockStore } from "./createMockStore";

import { themes } from "../themes";

/**
 * Test render function for a chart
 * @param  options.children     The set of React children
 * @param  options.data         The data for the chart
 * @param  options.scales      The keyed scales for the chart
 * @param  options.store       Optional specific store to use
 * @return                     { asFragment, container }
 */
export async function renderChart({
    children,
    data,
    scales,
    store,
}: {
    children: JSX.Element;
    data: IData;
    scales: Record<string, IScale>;
    store?: any;
}) {
    const mockStore = createMockStore({
        chart: {
            animationDuration: 0,
            dimensions: {
                height: 200,
                width: 200,
            },
            data,
            scales,
            theme: themes.light,
        },
    });

    const { asFragment, container } = render(
        <Provider store={store ?? mockStore}>
            <svg>{children}</svg>
        </Provider>
    );

    await wait(10);

    return { asFragment, container, store: store ?? mockStore };
}
