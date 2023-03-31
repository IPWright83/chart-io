import type { IData, IScale } from "@d3-chart/types";
import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "./createMockStore";
import { wait } from "./wait";

import { themes } from "../themes";

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
