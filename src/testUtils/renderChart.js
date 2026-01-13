import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { wait } from "./wait";
import { createMockStore } from "./createMockStore";

import { themes } from "../themes";

/**
 * Test render function for a chart
 * @param  {Array} options.children     The set of React children
 * @param  {Array} options.data         The data for the chart
 * @param  {Object} options.scales      The keyed scales for the chart
 * @return {Object}                     { asFragment, container }
 */
export const renderChart = async ({ children, data, scales }) => {
    const store = createMockStore({
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
        <Provider store={store}>
            <svg>{children}</svg>
        </Provider>,
    );

    await wait(1);

    return { asFragment, container, store };
};
