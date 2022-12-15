import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { wait } from "./wait";
import { createMockStore } from "./createMockStore";
import type { IStore } from "../store";
import type { IScaleFunction, IData } from "../types";

import { themes } from "../themes";

interface IRenderChartProps {
    children: React.ReactNode | Array<React.ReactNode>;
    data: IData;
    scales: Record<string, IScaleFunction>;
    store?: IStore;
}

/**
 * Test render function for a chart
 * @param  {Array} options.children     The set of React children
 * @param  {Array} options.data         The data for the chart
 * @param  {Object} options.scales      The keyed scales for the chart
 * @param  {Object} options.store       Optional specific store to use
 * @return {Object}                     { asFragment, container }
 */
export const renderChart = async ({ children, data, scales, store }: IRenderChartProps) => {
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
};
