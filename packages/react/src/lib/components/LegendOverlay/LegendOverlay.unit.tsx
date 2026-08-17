import { chartActions } from "@chart-io/core";
import { Provider } from "react-redux";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { LegendOverlay } from ".";

// jsdom doesn't implement PointerEvent, so `fireEvent.pointerDown` etc. dispatch an event with
// clientX/clientY/button all undefined - build the event by hand instead so the position/button
// checks in the drag handlers under test see real values
function pointerEvent(type: string, init: Partial<PointerEvent>) {
    const event = new Event(type, { bubbles: true, cancelable: true });
    return Object.assign(event, { button: 0, pointerId: 1, ...init });
}

describe("LegendOverlay", () => {
    const store = createMockStore({
        chart: {
            legend: {
                items: [
                    { name: "a", icon: "circle", color: "blue" },
                    { name: "b", icon: "square", color: "orange" },
                ],
            },
        },
    });

    beforeEach(() => {
        (store.dispatch as jest.Mock).mockClear();
    });

    it("should render docked at N correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <LegendOverlay position="N" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render docked at E (the default) correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <LegendOverlay />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", async () => {
        const store = createMockStore({
            chart: {
                legend: {
                    items: [],
                },
            },
        });

        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <LegendOverlay />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should seed the docked position into the store from the position prop", () => {
        render(
            <Provider store={store}>
                <svg>
                    <LegendOverlay position="SW" />
                </svg>
            </Provider>
        );

        expect(store.dispatch).toHaveBeenCalledWith(chartActions.setLegendPosition("SW"));
    });

    describe("dragging", () => {
        // jsdom doesn't implement the Pointer Capture APIs used to keep receiving move/up events
        // for the pointer that started the drag, even once it leaves the Legend's bounds
        beforeAll(() => {
            // @ts-ignore - jsdom doesn't implement this
            Element.prototype.setPointerCapture = jest.fn();
            // @ts-ignore - jsdom doesn't implement this
            Element.prototype.releasePointerCapture = jest.fn();
        });

        it("docks to the nearest compass position on drop, based on where it was released", () => {
            const { container } = render(
                <Provider store={store}>
                    <svg>
                        <LegendOverlay position="E" />
                    </svg>
                </Provider>
            );

            const foreignObject = container.querySelector("foreignObject");
            const legend = container.querySelector(".legend");

            jest.spyOn(foreignObject as Element, "getBoundingClientRect").mockReturnValue({
                left: 0,
                top: 0,
                width: 200,
                height: 200,
            } as DOMRect);
            jest.spyOn(legend as Element, "getBoundingClientRect").mockReturnValue({
                left: 150,
                top: 90,
                width: 40,
                height: 20,
            } as DOMRect);

            fireEvent(legend as Element, pointerEvent("pointerdown", { clientX: 160, clientY: 100 }));
            fireEvent(legend as Element, pointerEvent("pointermove", { clientX: 20, clientY: 20 }));
            fireEvent(legend as Element, pointerEvent("pointerup", { clientX: 20, clientY: 20 }));

            expect(store.dispatch).toHaveBeenCalledWith(chartActions.setLegendPosition("NW"));
        });
    });
});
