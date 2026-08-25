import { themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { Markers } from ".";
import { Markers as MarkersBase } from "./Markers";

describe("Markers", () => {
    const store = createMockStore({
        chart: {
            theme: themes.light,
        },
        event: {
            markers: [{ fill: "red", stroke: "blue", r1: 5, r2: 5, cx: 50, cy: 50 }],
        },
    });

    it("should render correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Markers />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should skip if there is no layer avaliable", () => {
        const layer = { current: null };

        render(
            <Provider store={store}>
                <svg>
                    <MarkersBase layer={layer} />
                </svg>
            </Provider>,
        );

        // Should be empty
        expect(layer).toMatchSnapshot();
    });

    it("stays non-interactive when a marker has no datum, e.g. a Scatter point's own hover halo", () => {
        const { container } = render(
            <Provider store={store}>
                <svg>
                    <Markers />
                </svg>
            </Provider>,
        );

        const marker = container.querySelector(".marker");
        expect(marker.getAttribute("pointer-events")).toBe("none");

        const dispatch = jest.spyOn(store, "dispatch");
        fireEvent.contextMenu(marker, { clientX: 1, clientY: 2 });

        expect(dispatch).not.toHaveBeenCalledWith(
            expect.objectContaining({ type: "event/openContextMenu" }),
        );
    });

    it("right-click opens a datum context menu for a marker that has one, e.g. a Line/Area's nearest-point indicator", () => {
        const datum = { date: "2024-01-01", value: 42 };
        const datumStore = createMockStore({
            chart: { theme: themes.light },
            event: {
                markers: [{ fill: "red", stroke: "blue", r1: 5, r2: 5, cx: 50, cy: 50, datum }],
            },
        });

        const { container } = render(
            <Provider store={datumStore}>
                <svg>
                    <Markers />
                </svg>
            </Provider>,
        );

        const marker = container.querySelector(".marker");
        expect(marker.getAttribute("pointer-events")).toBe("auto");

        fireEvent.contextMenu(marker, { clientX: 42, clientY: 24 });

        expect(datumStore.dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "event/openContextMenu",
                payload: expect.objectContaining({
                    x: 42,
                    y: 24,
                    context: { type: "datum", datum },
                }),
            }),
        );
    });
});
