import type { IData, IScale } from "@chart-io/core";
import { themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "./createMockStore";
import { wait } from "./wait";

export async function renderChart({
    children,
    data,
    scales = {},
    store,
}: {
    children: JSX.Element;
    data?: IData;
    scales?: Record<string, IScale>;
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
            scales: Object.entries(scales).reduce((result, [key, scaleFunc]) => {
                result[key] = {
                    domain: scaleFunc.domain(),
                    range: scaleFunc.range(),
                    scale: scaleFunc,
                };

                return result;
            }, {}),
            theme: themes.light,
        },
    });

    const { asFragment, container, rerender } = render(
        <Provider store={store ?? mockStore}>
            <svg>{children}</svg>
        </Provider>,
    );

    await wait(10);

    // Re-wraps replacement children in the same Provider/svg scaffolding, so a caller can rerender
    // with new props/children without having to reconstruct that boilerplate itself
    const rerenderChart = (newChildren: JSX.Element) =>
        rerender(
            <Provider store={store ?? mockStore}>
                <svg>{newChildren}</svg>
            </Provider>,
        );

    return { asFragment, container, store: store ?? mockStore, rerender: rerenderChart };
}
